let ListBooks = [];

export function Set_ArrayBooks(objeto){
    ListBooks.push(objeto);
}
export function Get_ArrayBooks(){
    return ListBooks;
}
export function Delete_Book(id_book){
    ListBooks = ListBooks.filter(objeto => objeto.id !== id_book);
    return true;
}