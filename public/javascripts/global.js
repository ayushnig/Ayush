// Userlist data array for filling in info box
var productListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

    // Username link click
    $('#productList table tbody').on('click', 'td a.linkshowproduct', showProductInfo);

    // Add User button click
    $('#btnAddProduct').on('click', addProduct);

    // Delete User link click
    $('#productList table tbody').on('click', 'td a.linkdeleteproduct', deleteProduct);

});

// Functions =============================================================

function populateTable() {
var tableContent = '';
$.getJSON( '/products/productlist', function( data ) {
        productListData = data;
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowproduct" rel="' + this.productname + '" title="Show Details">' + this.productname + '</a></td>';
            tableContent += '<td>' + this.SKU + '</td>';
            tableContent += '<td>' + this.Amount + '</td>';
            tableContent +='<td>' +this.Sales +'</td>';
            tableContent+='<td>' +this.OrderId+'</td>';
            tableContent += '<td><a href="#" class="linkdeleteproduct" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });
        $('#productList table tbody').html(tableContent);
    });
};

function showProductInfo(event) {

    event.preventDefault();

    var thisProductName = $(this).attr('rel');

    var arrayPosition = productListData.map(function(arrayItem) { return arrayItem.productname; }).indexOf(thisProductName);

    var thisProductObject = productListData[arrayPosition];

    $('#productInfoName').text(thisProductObject.productname);
    $('#productInfoSKU').text(thisProductObject.SKU);
    $('#productInfoAmount').text(thisProductObject.Amount);
    $('#productInfoSales').text(thisProductObject.Sales);
    $('#productInfoOrderId').text(thisProductObject.OrderId);


};

function addProduct(event) {
    event.preventDefault();

    var errorCount = 0;
    $('#addProduct input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    if(errorCount === 0) {

        var newProduct = {
            'productname': $('#addProduct fieldset input#inputProductName').val(),
            'SKU': $('#addProduct fieldset input#inputProductSKU').val(),
            'Amount': $('#addProduct fieldset input#inputProductAmount').val(),
            'Sales': $('#addProduct fieldset input#inputProductSales').val(),
            'OrderId': $('#addProduct fieldset input#inputProductOrderId').val()

        }
        $.ajax({
            type: 'POST',
            data: newProduct,
            url: '/products/addproduct',
            dataType: 'JSON'
        }).done(function( response ) {
            if (response.msg === '') {
                $('#addProduct fieldset input').val('');
                populateTable();

            }
            else {
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        alert('Please fill in all fields');
        return false;
    }
};
function deleteProduct(event) {

    event.preventDefault();
    var confirmation = confirm('Are you sure you want to delete this product?');
    if (confirmation === true) {

        $.ajax({
            type: 'DELETE',
            url: '/products/deleteproduct/' + $(this).attr('rel')
        }).done(function( response ) {

            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }
            populateTable();

        });

    }
    else {
        return false;

    }

};