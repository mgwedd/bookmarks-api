const BookmarksService = {
  getAllBookmarks( knex ) {
    return knex 
      .from( 'bookmarks' )
      .select( '*' );
  }, 
  insertBookmark( knex, newBookmark ) {
    return knex
      .insert( newBookmark )
      .into( 'bookmarks' )
      .returning( '*' )
      .then( ( rows ) => {
        return rows[0];
      } );
  },
  getBookmarkById( knex, id ) {
    return knex
      .select( '*' )
      .from( 'bookmarks' )
      .where( { id } )
      .first();
  },
  deleteBookmark( knex, id ) {
    return knex( 'bookmarks' )
      .where( { id } )
      .delete();
  },
  updateBookmark( knex, id, newBookmarkFields ) {
    return knex( 'bookmarks' )
      .where( { id } )
      .update( newBookmarkFields );
  }
}

module.exports = BookmarksService;
