import { useEffect, useRef, useState } from 'react'
import { createBook, createCheckout, getBook, listBookCheckouts, listBooks } from './api/api'
import './App.css'
import CheckoutForm from './components/CheckoutForm'
import BookDetail from './components/BookDetail'
import BookForm from './components/BookForm'
import BookList from './components/BookList'
import { GENRES, type Genre, type Checkout, type CheckoutFormValues, type Book, type BookFormValues } from './types'

const initialBookForm: BookFormValues = {
  title: '',
  genre: 'Fiction',
  description: '',
  author: '',
  publisher_email: '',
  shelf_location: '',
}

const initialCheckoutForm: CheckoutFormValues = {
  patron_name: '',
  book_id: '',
  date: new Date().toISOString().slice(0, 10),
  notes: '',
}

function errorText(err: unknown): string {
  return err instanceof Error ? err.message : 'Something went wrong. Please try again.'
}

function App() {
  const [books, setBooks] = useState<Book[]>([])
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [bookCheckouts, setBookCheckouts] = useState<Checkout[]>([])
  const [search, setSearch] = useState('')
  const [genreFilter, setGenreFilter] = useState<Genre | 'All'>('All')
  const [bookForm, setBookForm] = useState<BookFormValues>(initialBookForm)
  const [checkoutForm, setCheckoutForm] = useState<CheckoutFormValues>(initialCheckoutForm)
  const [error, setError] = useState<string | null>(null)
  // Bumping this re-runs the book list effect (e.g. after creating a book).
  const [booksVersion, setBooksVersion] = useState(0)
  // Id of the most recently clicked book, so a slow earlier response can't overwrite it.
  const latestSelectedId = useRef<number | null>(null)

  // Load books on mount and whenever the search, genre, or booksVersion changes.
  useEffect(() => {
    let ignore = false
    listBooks({ q: search, genre: genreFilter })
      .then((result) => {
        if (ignore) return
        setBooks(result)
        setError(null)
      })
      .catch((err: unknown) => {
        if (!ignore) setError(errorText(err))
      })
    // Ignore responses for an older search once a newer one has started.
    return () => {
      ignore = true
    }
  }, [search, genreFilter, booksVersion])

  function handleLoadBooks() {
    setBooksVersion((version) => version + 1)
  }

  async function handleSelectBook(bookId: number) {
    latestSelectedId.current = bookId
    setError(null)
    try {
      const [book, checkouts] = await Promise.all([getBook(bookId), listBookCheckouts(bookId)])
      if (latestSelectedId.current !== bookId) return
      setSelectedBook(book)
      setBookCheckouts(checkouts)
      setCheckoutForm((form) => ({ ...form, book_id: String(bookId) }))
    } catch (err) {
      if (latestSelectedId.current === bookId) setError(errorText(err))
    }
  }

  function handleBookFormChange(next: BookFormValues) {
    setBookForm(next)
  }

  function handleCheckoutFormChange(next: CheckoutFormValues) {
    setCheckoutForm(next)
  }

  async function handleCreateBook() {
    setError(null)
    try {
      await createBook(bookForm)
      setBookForm(initialBookForm)
      // Refetch so the new book shows up only if it matches the current filters.
      setBooksVersion((version) => version + 1)
    } catch (err) {
      setError(errorText(err))
    }
  }

  async function handleCreateCheckout() {
    setError(null)
    try {
      const created = await createCheckout(checkoutForm)
      if (selectedBook && created.book_id === selectedBook.id) {
        setBookCheckouts((checkouts) => [...checkouts, created])
      }
      setCheckoutForm({
        ...initialCheckoutForm,
        book_id: selectedBook ? String(selectedBook.id) : '',
      })
    } catch (err) {
      setError(errorText(err))
    }
  }

  return (
    <main className="layout">
      <header>
        <h1>LibraryConnect Resource Hub</h1>
        <p>Starter frontend scaffold with TODOs for API integration.</p>
      </header>

      {error ? <p className="error">{error}</p> : null}

      <section className="card">
        <h2>Integration TODO</h2>
        <p>
          Route handlers, form wiring, and API calls are intentionally left as TODOs for the team.
        </p>
        <button onClick={() => void handleLoadBooks()}>Load Books (TODO API)</button>
      </section>

      <BookList
        books={books}
        search={search}
        genreFilter={genreFilter}
        onSearchChange={setSearch}
        onGenreChange={setGenreFilter}
        onSelectBook={(bookId) => void handleSelectBook(bookId)}
        genres={GENRES}
      />

      <BookForm
        values={bookForm}
        genres={GENRES}
        onChange={handleBookFormChange}
        onSubmit={() => void handleCreateBook()}
      />

      <BookDetail book={selectedBook} checkouts={bookCheckouts} />

      <CheckoutForm
        values={checkoutForm}
        books={books}
        onChange={handleCheckoutFormChange}
        onSubmit={() => void handleCreateCheckout()}
      />
    </main>
  )
}

export default App
