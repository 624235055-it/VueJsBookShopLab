<template>
<div class="container">
    <br /><br />
    <div class="row">
        <div>
            <h2>Edit Book</h2>
            <br />
        </div>
    </div>
    <div class="container">

        <div class="form-group row">
            <div class="col">
                <div class="form-group">
                    <label for="title">Book Title:</label>
                    <input type="text" v-model="book.title" class="form-control" id="title" placeholder="Enter Book Title" name="title">
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <label for="author">Author:</label>
                    <input type="text" v-model="book.author" class="form-control" id="author" placeholder="Enter Author" name="author">
                </div>
            </div>
        </div>
        <div class="form-group row">
            <div class="col-4">
                <div class="form-group">
                    <label for="category">Category:</label>
                    <select v-model="book.category" class="form-control" id="category">
                        <option>Web Development</option>
                        <option>Internet</option>
                        <option>Java</option>
                        <option>Microsoft .NET</option>
                        <option>Mobile Technology</option>
                        <option>Programming</option>
                        <option>Software Engineering</option>
                        <option>Data Science</option>
                    </select>
                </div>
            </div>
            <div class="col-3">
                <div class="form-group">
                    <label for="ISBN">ISBN:</label>
                    <input type="text" v-model="book.isbn" class="form-control" id="ISBN" placeholder="Enter ISBN" name="ISBN">
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <label for="price">Price:</label>
                    <input type="number" v-model="book.price" class="form-control" id="price" placeholder="Enter Price" name="price">
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <label for="page">Pages:</label>
                    <input type="number" v-model="book.pageCount" class="form-control" id="page" placeholder="Enter Pages" name="page">
                </div>
            </div>
        </div>
        <div class="form-group row">
            <div class="col">
                <div class="form-group">
                    <label for="publishedDate">Published Date:</label>
                    <vc-date-picker v-model="book.publishedDate" mode="date" id="publishedDate" name="publishedDate" />
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <label for="bookimage">Upload Image:</label>
                    <UploadImage id="bookimage" name="bookimage" ref="bookimage" /><br>
                </div>
            </div>
        </div>
        <div class="form-group row">
            <div class="col">
                <div class="form-group">
                    <label for="description">Description:</label>
                    <textarea v-model="book.shortDescription" class="form-control" id="description" placeholder="Enter Description" rows="3"></textarea>

                </div>
            </div>
        </div>

        <button class="btn btn-primary" v-on:click="SaveBook()">Save</button>&nbsp;
        <button class="btn btn-danger" v-on:click="Cancel()">Cancel</button>

    </div>
    <br /><br />
</div>
</template>

<script>
import UploadImage from './UploadImage.vue';
import axios from "axios";
import moment from 'moment';
export default {
    name: "BookEdit",
    components:{
        UploadImage
        },
    data() {
        return {
            book: {},
            AccessToken:""
        }
    },
    methods: {
        async SaveBook() {

            if (confirm("Do you want to save?")) {

                this.book.publishedDate = moment(String(this.book.publishedDate)).format('YYYY-MM-DD');
                let bookimage = await this.$refs.bookimage.getFileName()

                if (await bookimage !== "") {
                    this.book.thumbnailUrl = await bookimage
                    await this.$refs.bookimage.UploadImage();
                }
                
                await axios.put(this.$apiUrl + "book/" + this.$route.params.bookid,this.book,{ headers: {"Authorization" : `bearer ${this.accessToken}`} });
                await this.$router.push('/books'); 
            }

        },
        Cancel() {
            if (confirm("Do you want to cancel editing this book?")) {
                this.$router.push('/books');
            }

        }
    },
    async mounted() {

    this.accessToken = await localStorage.getItem("accessToken");

    if (await this.accessToken) {
       try {
            //Code for get book detail from API
            const response = await axios.get(this.$apiUrl + "book/" + this.$route.params.bookid,{ headers: {"Authorization" : `bearer ${this.accessToken}`} });
            this.book = await response.data.data[0];
      } catch {
        this.$router.push("/login");
      }
    } else {
      this.$router.push("/login");
    }

        
    },
}
</script>

<style scoped>
.book-item {
    background: #f4f4f4;
    padding: 10px;
    border-bottom: 1px #ccc dotted;
}

label {
    /* Other styling... */
    text-align: right;
    clear: both;
    float: left;
    margin-right: 15px;
}
</style>