import Hire from "../models/Hire.js";
import Book from "../models/Book.js";
import User from "../models/User.js";

// Hire a book (requires active subscription)
export const hireBook = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bookId = req.params.bookId;

    const leaser = await User.findById(userId);
    if (!leaser) return res.status(404).json({ message: "User not found" });

    // Check subscription status
    if (!leaser.subscription || leaser.subscription.status !== "active") {
      return res
        .status(403)
        .json({ message: "Active subscription required to hire books" });
    }

    const book = await Book.findById(bookId).populate("owner");
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (!book.available)
      return res.status(400).json({ message: "Book is not available" });

    const hire = await Hire.create({
      book: book._id,
      lender: book.owner._id,
      leaser: leaser._id,
      startDate: new Date(),
      status: "active",
      leaserContact: {
        phone: leaser.phone,
        email: leaser.email,
        idNumber: leaser.idNumber,
        location: leaser.location,
      },
    });

    // Mark book unavailable while hired
    book.available = false;
    await book.save();

    res.status(201).json(hire);
  } catch (error) {
    next(error);
  }
};

// List hires (for authenticated user)
export const getUserHires = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const hires = await Hire.find({
      $or: [{ lender: userId }, { leaser: userId }],
    })
      .populate("book")
      .populate("lender", "username")
      .populate("leaser", "username");

    res.json(hires);
  } catch (error) {
    next(error);
  }
};

// Complete a hire
export const completeHire = async (req, res, next) => {
  try {
    const hireId = req.params.hireId;
    const userId = req.user.id;

    const hire = await Hire.findById(hireId);
    if (!hire) return res.status(404).json({ message: "Hire not found" });

    // Only lender or leaser can mark complete
    if (![hire.lender.toString(), hire.leaser.toString()].includes(userId)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    hire.status = "completed";
    hire.endDate = new Date();
    await hire.save();

    // Mark book available again
    const book = await Book.findById(hire.book);
    book.available = true;
    await book.save();

    res.json({ message: "Hire marked as completed" });
  } catch (error) {
    next(error);
  }
};
