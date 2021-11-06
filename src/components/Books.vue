<template>
  <div>
    <Header v-on:search:booktitle="SearchBook" />
    <br /><br />
    <div class="container">
      <div class="row">
        <div v-bind:key="book.bookid" v-for="book in BookInSearch">
          <BookItem v-bind:book="book" v-on:delete:book="DeleteBook" />
        </div>
      </div>
    </div>
    <br /><br />
  </div>
</template>

<script>
import BookItem from "./BookItem";
import Header from "./Header";
import axios from "axios";

export default {
  name: "Books",
  components: {
    BookItem,
    Header,
  },
  data() {
    return {
      search: "",
      books: [],
      //booksearch: []
    };
  },
  async created() {},

  async mounted() {
    let accessToken = await localStorage.getItem("accessToken");

    if (await accessToken) {
      try {
        //Code for GET Books from API
        const response = await axios.get(this.$apiUrl + "books" ,{ headers: {"Authorization" : `bearer ${accessToken}`} });
        this.books = await response.data.data;
        //this.booksearch = this.books
      } catch {
        this.$router.push("/login");
      }
    } else {
      this.$router.push("/login");
    }
  },

  methods: {
    SearchBook: function (searchvalue) {
      this.search = searchvalue;
    },
    async DeleteBook(bookid) {
    let accessToken = await localStorage.getItem("accessToken");

    if (await accessToken) {
      try {   
      await axios.delete(this.$apiUrl + "book/" + bookid,{ headers: {"Authorization" : `bearer ${accessToken}`} });
      var bookIndex = this.books.findIndex((x) => x.bookid === bookid);
      this.books.splice(bookIndex, 1);
      this.booksearch = this.books;
    } catch {
        this.$router.push("/login");
      }
    } else {
      this.$router.push("/login");
    }
    
    },
  },
  computed: {
    BookInSearch: function () {
      if (this.search != "") {
        return this.books.filter((book) => {
          return book.title.toLowerCase().includes(this.search.toLowerCase());
        });
      } else {
        return this.books;
      }
    },
  },
  filters: {},
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>