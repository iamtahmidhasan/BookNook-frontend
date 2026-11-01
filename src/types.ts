interface bookType {
    _id: string,
    title: string,
    author: string,
    descriptio: string,
    isbn: string,
    coverImage: string,
    category: string,
    language: string,
    publishedYear: number,
    totalCopies: number,
    availableCopies: number,
    ownerName?: string,
    ownerEmail?: string
}