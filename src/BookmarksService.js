const BookmarksService = {
    getAllBookmarks(knex) {
        return knex 
            .from('bookmarks')
            .select('*');
    }, 
    insertBookmark(knex, newBookmark) {
        return knex
            .insert(newBookmark)
            .into('bookmarks')
            .returning('*')
            .then(rows => {
                return rows[0];
            });
    },
}

module.exports = BookmarksService;
// REFERENCE
// const ArticlesService = {
//     getAllArticles(knex) {
//         return knex
//             .from('blogful_articles')
//             .select('*')
//     }, 
//     insertArticle(knex, newArticle) {
//         return knex
//             .insert(newArticle)
//             .into('blogful_articles')
//             .returning('*')
//             .then(rows => {
//                 return rows[0]
//             })
//     },
//     getById(knex, id) {
//         return knex
//             .select('*')
//             .from('blogful_articles')
//             .where('id', id)
//             .first()
//     },
//     deleteArticle(knex, id) {
//         return knex('blogful_articles')
//             .where({id})
//             .delete()
//     },
//     updateArticle(knex, id, newArticleFields) {
//         return knex('blogful_articles')
//             .where({ id })
//             .update(newArticleFields)
//     },
// }

// module.exports = ArticlesService;