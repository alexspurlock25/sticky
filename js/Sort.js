class Sort {

    constructor(){

    }
    byDateDesc(){

        $.ajax({
            method: "GET",
            url: "http://localhost:3000/sort-date-desc",
            success: function (response) {
                $("table tbody tr").remove();
                response.forEach( (row) => {

                    let htmlTableRow = "<tr id='row-" + row.infoid + "'>"
                        + "<td id='td-url'>" + row.url + "</td>"
                        + "<td id='td-username'>" + row.username + "</td>"
                        + "<td id='td-email'>" + row.email + "</td>"
                        + "<td id='td-password'>" + row.password + "</td>"
                        + "<td id='td-pass-stren-graded'>" + row.pass_strength_interpretation + "</td>"
                        + "<td><button value='"+ row.infoid +"' id='edit-btn-row' onclick='editRow(this)'><img alt='Edit' src=images/edit_icon.png'/></button><button value='"+ row.row_id +"' id='delete-btn-row' onclick='deleteRow(this)'><img alt='Delete' src='images/delete_icon.png'/></button></td>"
                        + "</tr>";

                    // append row
                    $("table tbody").append(htmlTableRow)
                    
                })

            }
        })
    }

    byDateASC(){
        
        $.ajax({
            method: "GET",
            url: "http://localhost:3000/sort-date-asc",
            success: function (response) {
                $("table tbody tr").remove();
                response.forEach( (row) => {

                    let htmlTableRow = "<tr id='row-" + row.infoid + "'>"
                        + "<td id='td-url'>" + row.url + "</td>"
                        + "<td id='td-username'>" + row.username + "</td>"
                        + "<td id='td-email'>" + row.email + "</td>"
                        + "<td id='td-password'>" + row.password + "</td>"
                        + "<td id='td-pass-stren-graded'>" + row.pass_strength_interpretation + "</td>"
                        + "<td><button value='"+ row.infoid +"' id='edit-btn-row' onclick='editRow(this)'><img alt='Edit' src=images/edit_icon.png'/></button><button value='"+ row.row_id +"' id='delete-btn-row' onclick='deleteRow(this)'><img alt='Delete' src='images/delete_icon.png'/></button></td>"
                        + "</tr>";

                    // append row
                    $("table tbody").append(htmlTableRow)
                    
                })

            }
        })
    }

    byTitleAlphaDESC(){
        $("#filter-recent").text("Recent")
        $("#filter-a-z").text("TITLE: Z-A")

        $.ajax({
            method: "GET",
            url: "http://localhost:3000/sort-title-alpha-desc",
            success: function (response) {
                $("table tbody tr").remove();
                
                response.forEach( (row) => {

                    let htmlTableRow = "<tr id='row-" + row.infoid + "'>"
                        + "<td id='td-url'>" + row.url + "</td>"
                        + "<td id='td-username'>" + row.username + "</td>"
                        + "<td id='td-email'>" + row.email + "</td>"
                        + "<td id='td-password'>" + row.password + "</td>"
                        // + "<td id='td-date'>" + row.date + "</td>"
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

        console.log("sorted by alpha! (title desc)")
    }

    byTitleAlphaASC(){
        $("#filter-a-z").text("TITLE: A-Z")

        $.ajax({
            method: "GET",
            url: "http://localhost:3000/sort-title-alpha-asc",
            success: function (response) {
                $("table tbody tr").remove();
                
                response.forEach( (row) => {

                    let htmlTableRow = "<tr id='row-" + row.infoid + "'>"
                        + "<td id='td-url'>" + row.url + "</td>"
                        + "<td id='td-username'>" + row.username + "</td>"
                        + "<td id='td-email'>" + row.email + "</td>"
                        + "<td id='td-password'>" + row.password + "</td>"
                        // + "<td id='td-date'>" + row.date + "</td>"
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
    }

    byPassSecurityDESC(){
        console.log("sorted by password security! (desc)")
    }

    byPassSecurityASC() {
        console.log("sorted by password security! (asc)")
    }

}

$("#filter-recent").on("click", toggleTwoFunctions (  function() {
    new Sort().byDateDesc()
    $("tbody td:last-child").hide()
    $("thead th:last-child").hide()
}, function() {
    new Sort().byDateASC()
}))

$("#filter-a-z").on("click", toggleTwoFunctions( function() {
    new Sort().byTitleAlphaDESC()
}, function() {
    new Sort().byTitleAlphaASC()
}))

$("#filer-security").on("click", toggleTwoFunctions( function() {
    new Sort().byPassSecurityDESC()
}, function() {
    new Sort().byPassSecurityASC()
}))
