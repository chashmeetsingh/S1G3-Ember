import Controller from '@ember/controller';
import $ from 'jquery';

export default Controller.extend({
  actions: {
    publishPost: function() {
      var newPost = this.store.createRecord('post', {
        title: this.get('title'),
        body: this.get('body')
      });
      newPost.save();
      $("#postTitle").val("");
      $("#postBody").val("");
    },
    editPost: function(post) {
      this.store.findRecord('post', post.id).then(function (updatedPost) {
        updatedPost.title = post.title;
        updatedPost.body = post.body;
        updatedPost.save();
      }
    )},
    deletePost: function(post) {
      // console.log(this.get('store'), post);
      this.store.findRecord('post', post.id).then(function (post) {
        post.deleteRecord();
        post.get('isDeleted');
        post.save();
      })
    },
    openDeleteModal: function (post) {
      $('.ui.deletePost.modal').modal({
        closable: false,
        detachable: false,

        onDeny: () => {
          return true;
        },

        onApprove: () => {
          this.store.findRecord('post', post.id).then(function (post) {
            post.deleteRecord();
            post.get('isDeleted');
            post.save();
          });
          return true;
        }
      }).modal('show');
    },
    openEditModal: function (post) {
      $('#editPostTitle').val(post.title);
      $('#editPostBody').val(post.body);
      $('.ui.editPost.modal').modal({
        closable: false,
        detachable: false,

        onDeny: () => {
          return true;
        },

        onApprove: () => {
          // alert($('#editPostTitle').val());
          this.store.findRecord('post', post.id).then(function (post) {
            post.set('title', $('#editPostTitle').val());
            post.set('body', $('#editPostBody').val());
            post.save();
          });
          return true;
        }
      }).modal('show');
    }
  }
});
