<template>
<div class="book-item">
    <br />

    <div class="container ">
        <div class="row">
            <div class="col-lg-4">
                <img v-bind:src="require(`@/assets/bookImages/`+ book.thumbnailUrl)" width="200px" /><br>
            </div>
            <div class="col-lg-8">

                <div class="row">
                    <div>
                        <h2>{{book.title}}</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 d-flex justify-content-start"><b>Price:</b></div>
                    <div>{{book.price}}</div>
                </div>
                <div class="row">
                    <div class="col-2 d-flex justify-content-start"><b>Author:</b></div>
                    <div>{{book.author}}</div>
                </div>
                <div class="row">
                    <div class="col-2 d-flex justify-content-start"><b>Category:</b></div>
                    <div>{{book.category}}</div>
                </div>
                <div class="row">
                    <div class="col-2 d-flex justify-content-start"><b>ISBN:</b></div>
                    <div>{{book.isbn}}</div> 
                     
                </div>
                <div class="row">
                    <div class="col-2 d-flex justify-content-start"><b>Pages:</b></div>
                    <div>{{book.pageCount}}</div>
                </div>
                <div class="row">
                    <div class="col-2 d-flex justify-content-start"><b>publishedDate:</b></div>
                    <div>{{book.publishedDate | formatData}}</div>
                </div>
                <div class="row">
                    <div class="col-2 d-flex justify-content-start"><b>Description:</b></div>
                    <div class="col-9">
                        <p class="text-justify">{{book.shortDescription}}</p>
                    </div>
                </div>
                <button class="btn btn-primary btn-sm" v-on:click="EditBook(book.bookid)">Edit Book</button>&nbsp;
                <button class="btn btn-danger btn-sm" v-on:click="DeleteBook(book.bookid)">Delete Book</button>
                <br />
            </div>
        </div>
    </div>
    <br />
</div>
</template>

<script>
import moment from 'moment';
export default {
    name: "BookItem",
    props: ["book"],
    methods: {
        EditBook(bookid) {
            //Send bookid to Edit Book page
            this.$router.push('/editbook/' + bookid )
        },
        DeleteBook(bookid) {

            if (confirm("Do you want to delete this book?")) {

                this.$emit('delete:book',bookid)

            }

        },
    },
    filters: {
        formatDate(value) {
            if (value) {
                moment.locale('th')
                //return moment(String(value)).format('L')
                //return moment(String(value)).format('LL')
                //return moment(String(value)).format('DD/MM/YYYY')
                return moment(String(value)).format('D MMMM YYYY')
            }
        }
    }
}
</script>

<style scoped>
.book-item {

    padding: 10px;
    border-bottom: 1px #ccc dotted;
}
</style>