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
                        + "<td><button value='"+ row.infoid +"' id='edit-btn-row' onclick='editRow(this)'><img alt='Edit' src='images/edit_icon.png'/></button><button value='"+ row.row_id +"' id='delete-btn-row' onclick='deleteRow(this)'><img alt='Delete' src='images/delete_icon.png'/></button></td>"
                        + "</tr>";

                    // append row
                    $("table tbody").append(htmlTableRow)
                    
                })

                $("tbody td:nth-child(5)").hide()
                $("thead th:nth-child(5)").hide()
                $("tbody td:last-child").hide()
                $("thead th:last-child").hide()

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
                        + "<td><button value='"+ row.infoid +"' id='edit-btn-row' onclick='editRow(this)'><img alt='Edit' src='images/edit_icon.png'/></button><button value='"+ row.row_id +"' id='delete-btn-row' onclick='deleteRow(this)'><img alt='Delete' src='images/delete_icon.png'/></button></td>"
                        + "</tr>";

                    // append row
                    $("table tbody").append(htmlTableRow)
                    
                })

                $("tbody td:nth-child(5)").hide()
                $("thead th:nth-child(5)").hide()
                $("tbody td:last-child").hide()
                $("thead th:last-child").hide()

            }
        })
    }

    byTitleAlphaDESC(){

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
                        + "<td id='td-pass-stren-graded'>" + row.pass_strength_interpretation + "</td>"
                        + "<td><button value='"+ row.infoid +"' id='edit-btn-row' onclick='editRow(this)'><img alt='Edit' src='images/edit_icon.png'/></button><button value='"+ row.infoid +"' id='delete-btn-row' onclick='deleteRow(this)'><img alt='Delete' src='images/delete_icon.png'/></button></td>"
                        + "</tr>";
        
                    $("table tbody").append(htmlTableRow)
                    
                })

                $("tbody td:nth-child(5)").hide()
                $("thead th:nth-child(5)").hide()
                $("tbody td:last-child").hide()
                $("thead th:last-child").hide()

            },
            error: function(){
                console.log("Error: Failed to load data.")
            }
        })

    }

    byTitleAlphaASC(){

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
                        + "<td id='td-pass-stren-graded'>" + row.pass_strength_interpretation + "</td>"
                        + "<td><button value='"+ row.infoid +"' id='edit-btn-row' onclick='editRow(this)'><img alt='Edit' src='images/edit_icon.png'/></button><button value='"+ row.infoid +"' id='delete-btn-row' onclick='deleteRow(this)'><img alt='Delete' src='images/delete_icon.png'/></button></td>"
                        + "</tr>";
        
                    $("table tbody").append(htmlTableRow)
                    
                })

                $("tbody td:nth-child(5)").hide()
                $("thead th:nth-child(5)").hide()
                $("tbody td:last-child").hide()
                $("thead th:last-child").hide()

            },
            error: function(){
                console.log("Error: Failed to load data.")
            }
        })
    }

    byPassSecurityDESC(){

        $.ajax({
            method: "GET",
            url: "http://localhost:3000/sort-pass-sec-desc",
            success: function (response) {
                $("table tbody tr").remove();
                
                response.forEach( (row) => {

                    let htmlTableRow = "<tr id='row-" + row.infoid + "'>"
                        + "<td id='td-url'>" + row.url + "</td>"
                        + "<td id='td-username'>" + row.username + "</td>"
                        + "<td id='td-email'>" + row.email + "</td>"
                        + "<td id='td-password'>" + row.password + "</td>"
                        + "<td id='td-pass-stren-graded'>" + row.pass_strength_interpretation + "</td>"
                        + "<td><button value='"+ row.infoid +"' id='edit-btn-row' onclick='editRow(this)'><img alt='Edit' src='images/edit_icon.png'/></button><button value='"+ row.infoid +"' id='delete-btn-row' onclick='deleteRow(this)'><img alt='Delete' src='images/delete_icon.png'/></button></td>"
                        + "</tr>";
        
                    $("table tbody").append(htmlTableRow)
                    
                })

                $("tbody td:nth-child(5)").show(300)
                $("thead th:nth-child(5)").show(300)
                $("tbody td:last-child").hide()
                $("thead th:last-child").hide()
            },
            error: function(){
                console.log("Error: Failed to load data.")
            }
        })

    }

    byPassSecurityASC() {

        $.ajax({
            method: "GET",
            url: "http://localhost:3000/sort-pass-sec-asc",
            success: function (response) {
                $("table tbody tr").remove();
                
                response.forEach( (row) => {

                    let htmlTableRow = "<tr id='row-" + row.infoid + "'>"
                        + "<td id='td-url'>" + row.url + "</td>"
                        + "<td id='td-username'>" + row.username + "</td>"
                        + "<td id='td-email'>" + row.email + "</td>"
                        + "<td id='td-password'>" + row.password + "</td>"
                        + "<td id='td-pass-stren-graded'>" + row.pass_strength_interpretation + "</td>"
                        + "<td><button value='"+ row.infoid +"' id='edit-btn-row' onclick='editRow(this)'><img alt='Edit' src='images/edit_icon.png'/></button><button value='"+ row.infoid +"' id='delete-btn-row' onclick='deleteRow(this)'><img alt='Delete' src='images/delete_icon.png'/></button></td>"
                        + "</tr>";
        
                    $("table tbody").append(htmlTableRow)
                    
                })

                $("tbody td:nth-child(5)").show(300)
                $("thead th:nth-child(5)").show(300)
                $("tbody td:last-child").hide()
                $("thead th:last-child").hide()
            },
            error: function(){
                console.log("Error: Failed to load data.")
            }
        })

    }

}

    hide_duration = 200;
    show_duration = 200;

$("#filter-recent").on("click", toggleTwoFunctions (  function() {
    new Sort().byDateDesc()
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
