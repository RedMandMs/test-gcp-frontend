const rootSourceDomain = 'https://spanner-service-dot-gcp-learning-test.appspot.com';
const rootDomain = 'http://localhost:8000';

$(document).ready(function () {
    start();
});

function start() {
    $('#btn-refresh-all-object').on('click', refreshAllObjects);
    $('#createObjectForm').submit(createNewObject);
    $('#updateObjectForm').submit(updateObject);    
    refreshAllObjects();
};

function refreshAllObjects() {
    const oldObjects = $("#objectTable tr:not(#tableHeader)");
    $.ajax({
        type: 'GET',
        url: `${rootSourceDomain}/objects`,
        dataType: 'json',
        success: function (data) {
            for (let [index, obj] of data.entries()) {
                $("#objectTable").append(`<tr> 
                <td>${index + 1}</td>
                <td>${obj.id}</td> 
                <td>${obj.name}</td>
                <td><button onclick="viewObject(${obj.id})">&#128269;Open</button></td>
                <td><button onclick="deleteObject(${obj.id})">&#10060;Delete</button></td>
                </tr>`);
            }
            oldObjects.remove();
        },
        error: function (textStatus, errorThrown) {
            console.log(`Провал: ${errorThrown}`);
        }
    });
}

function createNewObject(e) {
    e.preventDefault();
    $.ajax({
        url: `${rootSourceDomain}/objects?name=${$('#nameCreate').val()}`,
        type: 'post',
        dataType: 'json',
        data: $('#createObjectForm').serialize(),
        success: function (data) {
            console.log(`Успех: id:${data.id}, Name:${data.name}`);
            $('#nameCreate').val('');
            refreshAllObjects();
        },
        error: function (textStatus, errorThrown) {
            alert('Ошибка создания объекта');            
            console.log(`Провал: ${errorThrown}`);
        }
    });
}

function viewObject(objId) {
    $.ajax({
        type: 'GET',
        url: `${rootSourceDomain}/objects/${objId}`,
        dataType: 'json',
        success: function (obj) {
            showObject(obj);
        },
        error: function (textStatus, errorThrown) {
            alert('Ошибка просмотра объекта');            
            console.log(`Провал: ${errorThrown}`);
        }
    });
}

function showObject(obj) {
    $('#allObjects').hide();
    $('#viewObject').show();
    $('#idView').val(obj.id);
    $('#nameView').val(obj.name);
}

function showAllObjects() {
    refreshAllObjects();
    lockEdit(true);
    $('#viewObject').hide();
    $('#allObjects').show();
}

function lockEdit(lock) {
    if (lock) {
        $('#updateObj').hide();
        $('#allowEdit').show();
    } else {
        $('#updateObj').show();
        $('#allowEdit').hide();
    }
    $('#nameView').prop('disabled', lock);
}

function deleteObject(objId){
    $.ajax({
        type: 'DELETE',
        url: `${rootSourceDomain}/objects/${objId}`,
        success: function (obj) {
            refreshAllObjects();
        },
        error: function (textStatus, errorThrown) {
            alert('Ошибка удаления объекта');
            console.log(`Провал: ${errorThrown}`);
        }
    });
}

function updateObject(e){
    e.preventDefault();
    $.ajax({
        url: `${rootSourceDomain}/objects/${$('#idView').val()}?name=${$('#nameView').val()}`,
        type: 'put',
        data: $('#updateObjectForm').serialize(),
        success: function () {
            console.log(`Успех`);
            lockEdit(true);
        },
        error: function (textStatus, errorThrown) {
            alert('Ошибка обновления объекта');            
            console.log(`Провал: ${errorThrown}`);
        }
    });
}
