<template>
<div class="student-item">
    <br />

    <div class="container ">
        <div class="row">
            <div class="col-lg-4">
            </div>
            <div class="col-lg-8">

                <div class="row">
                    <div class="col-2 d-flex justify-content-center"><b>studentId:</b></div>
                    <div><br/>{{student.studentId}}</div>
                </div>
                <div class="row">
                    <div class="col-2 d-flex justify-content-center"><b>studentName:</b></div>
                    <div><br/>{{student.studentName}}</div>
                </div>
                <br/><br/>
                <button class="btn btn-primary btn-sm" v-on:click="EditStudent(student.number)">Edit Student</button>&nbsp;
                <br/><br/>
                <button class="btn btn-danger btn-sm" v-on:click="DeleteStudent(student.number)">Delete Student</button>
                <br />
            </div>
        </div>
    </div>
    <br />
</div>
</template>

<script>
export default {
    name: "StudentItem",
    props: ["student"],
    methods: {
        EditStudent(number) {
            //Send bookid to Edit Book page
            this.$router.push('/editstudent/' + number )
        },
        DeleteStudent(number) {

            if (confirm("Do you want to delete this student?")) {

                this.$emit('delete:student',number)

            }

        },
    }
}
</script>

<style scoped>
.student-item {

    padding: 10px;
    border-bottom: 1px #ccc dotted;
}
</style>