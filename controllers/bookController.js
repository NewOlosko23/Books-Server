import Book from "../models/Book.js";

// Add a book
export const addBook = async (req, res, next) => {
  try {
    const { title, author, description, coverImage, location } = req.body;
    const userId = req.user.id;

    if (!title || !author || !location) {
      return res
        .status(400)
        .json({ message: "Title, author and location are required" });
    }

    const book = await Book.create({
      title,
      author,
      description,
      owner: userId,
      coverImage,
      location,
      available: true,
    });

    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

// Get all available books
export const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find({ available: true }).populate(
      "owner",
      "username location"
    );
    res.json(books);
  } catch (error) {
    next(error);
  }
};

// Get book details by id
export const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      "owner",
      "username location"
    );
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    next(error);
  }
};

// Update book by id (owner only)
export const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, author, description, coverImage, location, available } =
      req.body;

    book.title = title ?? book.title;
    book.author = author ?? book.author;
    book.description = description ?? book.description;
    book.coverImage = coverImage ?? book.coverImage;
    book.location = location ?? book.location;
    if (available !== undefined) book.available = available;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
};

// Delete book by id (owner only)
export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await book.remove();
    res.json({ message: "Book removed" });
  } catch (error) {
    next(error);
  }
};
