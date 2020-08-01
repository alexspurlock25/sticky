class Sort {

    constructor(){

    }
    byDateDesc(){

        $.ajax({
            method: "GET",
            url: "http://localhost:3000/sort_desc",
            success: function (response) {
                $("table tbody tr").remove();
                $("#")
                response.forEach( (row) => {

                    let htmlTableRow = "<tr id='row-" + row.infoid + "'>"
                        + "<td id='td-url'>" + row.url + "</td>"
                        + "<td id='td-username'>" + row.username + "</td>"
                        + "<td id='td-email'>" + row.email + "</td>"
                        + "<td id='td-password'>" + row.password + "</td>"
                        + "<td id='td-date'>" + row.date + "</td>"
                        + "<td><button value='"+ row.infoid +"' id='edit-btn-row' onclick='editRow(this)'><img alt='Edit' src='https://img.icons8.com/windows/32/000000/edit.png'/></button><button value='"+ row.infoid +"' id='delete-btn-row' onclick='delete_row(this)'><img alt='Delete' src='https://img.icons8.com/windows/32/000000/trash.png'/></button></td>"
                        + "</tr>";
        
                    $("table tbody").append(htmlTableRow)
                    
                })

                $("tbody td:last-child").hide()
                $("thead th:last-child").hide()
            },
            error: function(){
                console.log("Error: Failed to load data.")
            }
        })

        console.log("sorted by date (desc)!")
    }
    byDateASC(){

        $.ajax({
            method: "GET",
            url: "http://localhost:3000/info",
            success: function (response) {

                $("table tbody tr").remove();
                response.forEach( (row) => {

                    let htmlTableRow = "<tr id='row-" + row.infoid + "'>"
                        + "<td id='td-url'>" + row.url + "</td>"
                        + "<td id='td-username'>" + row.username + "</td>"
                        + "<td id='td-email'>" + row.email + "</td>"
                        + "<td id='td-password'>" + row.password + "</td>"
                        + "<td id='td-date'>" + row.date + "</td>"
                        + "<td><button value='"+ row.infoid +"' id='edit-btn-row' onclick='editRow(this)'><img alt='Edit' src='https://img.icons8.com/windows/32/000000/edit.png'/></button><button value='"+ row.infoid +"' id='delete-btn-row' onclick='delete_row(this)'><img alt='Delete' src='https://img.icons8.com/windows/32/000000/trash.png'/></button></td>"
                        + "</tr>";
        
                    $("table tbody").append(htmlTableRow)
                    
                })

                $("tbody td:last-child").hide()
                $("thead th:last-child").hide()
            },
            error: function(){
                console.log("Error: Failed to load data.")
            }
        })
        console.log("sorted by date (asc)");
    }
    byAlpha(){
        console.log("sorted by alpha!")
    }
    byPassSecurity(){
        console.log("sorted by password security!")
    }

}

$("#filter-recent").on("click", toggleTwoFunctions (  function () {
    new Sort().byDateDesc()
}, function() {
    new Sort().byDateASC()
}))

$("#filter-a-z").click(() => {
    let sort = new Sort()
    sort.byAlpha()
})
$("#filer-security").click(() => {
    let sort = new Sort()
    sort.byPassSecurity()
})
