import { connection as sql } from '../database/db.js';

export const PostService = {
    create: async(newPost, result) => {
        sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
            if (err) {
                result(err, null);
            } else result(null, { id: res.postId, ...newPost });
        });
    },
    findById: (postId, result) => {
        sql.query(
            `SELECT * FROM posts WHERE id = ?`, [postId],
            (err, res) => {
                if (err) {
                    result(err, null);
                } else if (res.length) {
                    result(null, res[0]);
                } else result({ message: "post not found" }, null);
            }
        );
    },
    getAll: (result) => {
        sql.query("SELECT * FROM posts", (err, res) => {
            if (err) {
                result(null, err);
            } else result(null, res);
        });
    },
    updateById: (id, post, result) => {
        sql.query(
            "UPDATE posts SET ? where id= ?", [post, id],
            (err, res) => {
                if (err) {
                    result(null, err);
                } else if (res.affectedRows == 0) {
                    result({ message: "post not found" }, null);
                } else result(null, { id: id, ...post });
            }
        );
    },
    remove: (id, result) => {
        sql.query("DELETE FROM posts WHERE id = ?", id, (err, res) => {
            if (err) {
                result(null, err);
            } else if (res.affectedRows == 0) {
                result({ message: "post not found" }, null);
            } else result(null, res);
        });
    },
    removeAll: (result) => {
        sql.query("DELETE FROM posts", (err, res) => {
            if (err) {
                result(null, err);
            } else result(null, res);
        });
    },
};