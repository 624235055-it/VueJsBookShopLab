<template>
<div class="container">
    <br /><br />
    <div class="row">
        <div>
            <h2>Add New Student</h2>
            <br />
        </div>
    </div>
    <div class="container">

        <div class="form-group row">
            <div class="col">
                <div class="form-group">
                    <label for="title">studentId:</label>
                    <input type="text" v-model="student.studentId" class="form-control" id="studentId" placeholder="Enter StudentId" name="studentId">
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <label for="author">studentName:</label>
                    <input type="text" v-model="student.studentName" class="form-control" id="studentName" placeholder="Enter StudentName" name="studentName">
                </div>
            </div>
        </div>

        <button class="btn btn-primary" v-on:click="SaveStudent()">Save</button>&nbsp;
        <button class="btn btn-danger" v-on:click="Cancel()">Cancel</button>

    </div>
    <br /><br />
</div>
</template>

<script>
import axios from "axios";
export default {
    name: "StudentAddNew",
    data() {
        return {
            student: {
                studentId: "",
                studentName: ""
            }
        }
    },
    methods: {
        async SaveStudent() {
            
            await axios.post(this.$apiUrl + "student", this.student);
            await this.$router.push('/students');
        

        },
        Cancel() {
            if (confirm("Do you want to cancel adding this student?")) {

                this.$router.push('/students');

            }

        }
    }
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