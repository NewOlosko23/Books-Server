import User from "../models/User.js";

// Mock subscription purchase endpoint
export const subscribe = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { tier } = req.body;

    if (!tier || !["Basic", "Standard", "Premium"].includes(tier)) {
      return res.status(400).json({ message: "Invalid subscription tier" });
    }

    const now = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // 1 month subscription

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        subscription: {
          tier,
          status: "active",
          startDate: now,
          endDate,
        },
      },
      { new: true }
    );

    res.json({
      message: `Subscribed to ${tier} tier successfully`,
      subscription: updatedUser.subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.subscription || { status: "inactive" });
  } catch (error) {
    next(error);
  }
};
