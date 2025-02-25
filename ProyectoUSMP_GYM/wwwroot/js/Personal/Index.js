﻿$(document).ready(function () {

    let TablePersonal = $("#TablePersonal");
    let btnAddPersonal = $("#btnAddPersonal");

    btnAddPersonal.on("click", function (e) {
        e.preventDefault();
        InvocarModal();
    });
    // Funcion Invocar un Modal
    function InvocarModal(id) {
        AbrirModal(`/Personal/MantenimientoPersonal/${id ? id : ""}`);
    }
    // Funcion para Abrir un Modal
    function AbrirModal(url) {

        $.ajax({
            type: 'GET',
            url: url,
            dataType: "html",
            cache: false,
            success: function (data) {
                $('.modal-container').html(data).find('.modal').modal({
                    show: true
                });
            }
        });
    }
// Agregar Personal Administrativo
    $(".modal-container").on("click", "#btnSave", function (e) {
        e.preventDefault();
        let Personal = {

            "Dni": $("#Dni").val(),
            "Nombre": $("#Nombre").val(),
            "Apellidopaterno": $("#Apellidopaterno").val(),
            "Apellidomaterno": $("#Apellidomaterno").val(),
            "Telefono": $("#Telefono").val(),
            "Direccion": $("#Direccion").val(),
            "Email": $("#Email").val(),
            "FkRol": $("#FkRol").val(),
            "Usuario": $("#Usuario").val(),
            "Passwords": $("#Passwords").val()


        }
       
        Swal.fire({
            title: 'Desea Registrar a este Personal?',
            showDenyButton: true,
            confirmButtonText: 'Registrar',
            denyButtonText: `Cancelar`,
            denyButtonClass: 'button-cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: '/Personal/CreatePersonal',
                    data: JSON.stringify(Personal),
                    type: 'POST',
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        if (data.state == 200) {
                            console.log(data);
                            Swal.fire('Saved!', '', 'success')
                            $('#modal-default').modal('hide');
                        }
                    },
                    error: function (error) {
                        if (error.status === 400) {
                            Swal.fire('Upss! Ocurrio Algo.', '', 'info')
                        }
                    }
                });
            }
            else if (result.isDenied) {
                Swal.fire('Cambios no Registrados', '', 'info')
                $('#modal-default').modal('hide');
            }

        })
        

        
    });

    // Listado de Personal Consumiendo Datataables
    TablePersonal.DataTable({
        scrollY: 200,
        scrollX: true,
        paging: false,
        ordering:false,
        ajax: {
            url: '/Personal/GetAllPersonal',
        },
        columnDefs: [
            { targets: 0, width: 100},
            { targets: 1, width: 110},
            { targets: 2, width: 180 },
            { targets: 3, width: 180 },
            { targets: 4, width: 210 },
            { targets: 5, width: 100 },
            { targets: 6, width: 210 },
            { targets: 7, width: 150 },
            { targets: 8, width: 100 },
            { targets: 9, width: 100 },
            { targets: 10, width: 110 },
        ],
        columns: [
            { data: "dni", title:"Dni" },
            { data: "nombre", title: "Nombre" },
            { data: "apellidopaterno", title: "Apellido Paterno" },
            { data: "apellidomaterno", title: "Apellido Materno" },
            { data: "direccion", title: "Direccion" },
            { data: "telefono", title:"Celular" },
            { data: "email", title: "Email" },
            { data: "fechacrea", title: "Fecha de Ingreso" },
            { data: "fkRol", title: "Cargo" },
            { data: "isdeleted", title: "Estado" },
            { data: "usuario", title:"Usuario Login" }
        ]
    });

});