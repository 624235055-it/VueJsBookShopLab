<template>
<div>
    <HeaderStudent v-on:search:studentId="SearchStudents" />
    <br /><br />
    <div class="container">
        <div class="row">
            <div v-bind:key="student.number" v-for="student in StudentInSearch">
                <StudentItem v-bind:student="student" v-on:delete:student="DeleteStudent" />
            </div>

        </div>
    </div>
    <br /><br />
</div>
</template>

<script>
import StudentItem from './StudentItem';
import HeaderStudent from './HeaderStudent';
import axios from "axios";

export default {

    name: "Students",
    components: {
        StudentItem,
        HeaderStudent
    },
    data() {
        return {
            search: "",
            students: [],
            //studentsearch: []
        }
    },
    async created() {

    },
    async mounted() {
        //Code for GET students from API
        const response = await axios.get(this.$apiUrl + "students");
        this.students = await response.data.data;
        
    },
    methods: {
        SearchStudents: function (searchvalue) {
            this.search = searchvalue;
        },
        async DeleteStudent(number) {
             await axios.delete(this.$apiUrl + "student/" + number);
             var studentIndex=this.students.findIndex(x => x.number === number);
             this.students.splice(studentIndex, 1);
             this.studentsearch = this.students;
        },

    },
    computed: {

        StudentInSearch: function () {
            if (this.search != "") {
                return this.students.filter((student) => {
                    return student.studentId(this.search)
                });

            } else {
                return this.students;
            }
        }

    },
    filters: {

    }
}
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