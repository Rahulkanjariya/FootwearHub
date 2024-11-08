function siteAlert(status, message, save) {
    if (message) {
        if (status) {
            toastr['success'](message, 'Success', { closeButton: true, tapToDismiss: false });
        }
        else {
            toastr['error'](message, 'Error', { closeButton: true, tapToDismiss: false });
        }
    }
}
function uniqueId(length) {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    return result;
}
function siteAjaxAlert(success, data, save) {
    if (success) {
        if (data.message != undefined) {
            siteAlert(1, data.message, save);
        }
    }
    else {
        if (data.responseJSON != undefined && data.responseJSON.message != undefined) {
            siteAlert(0, data.responseJSON.message, save);
        }
        else if (data.responseMessage != undefined) {
            siteAlert(0, data.responseMessage, save);
        }
        else if (data.message != undefined) {
            siteAlert(0, data.message, save);
        }
        else if (data.statusText != undefined) {
            siteAlert(0, data.statusText, save);
        }
    }
}

function siteSelect2(eles) {
    eles = typeof eles == "string" ? jQuery(eles) : eles;
    if (eles.length) {
        eles.each(function () {
            let self = jQuery(this);
            if (self.hasClass("select2-hidden-accessible")) {
                self.select2("destroy");
            }

            self.select2({
                // theme: 'bootstrap4',
                dropdownAutoWidth: true,
                width: "100%",
                allowClear: true,
                placeholder: "Please Select",
                dropdownParent: self.parent(),
            });
        });
    }
}
siteSelect2('.select2');

if (jQuery(".crud-frm").length) {
    jQuery(".crud-frm").each(function () {
        siteFormSave(jQuery(this));
    });
}
function siteFormSave(formSelector) {
    $(formSelector).on('submit', function (event) {
        event.preventDefault();
        var url = $(this).attr('action');
        var formData = new FormData(this);

        /* This code is to by pass server issue while storing any youtube URL */
        formData.forEach(function (value, key) {
            if (key == 'url') {
                formData.set(key, btoa(value));
            }
        });
        /* This code is to by pass server issue while storing any youtube URL */

        $.ajax({
            url: url,
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "JSON",
            success: function (data) {
                console.log('Sucessssssssssss', data);
                if (data.url != undefined) {
                    siteAjaxAlert(1, data, 1);
                    setTimeout(() => {
                        window.location.replace(data.url);
                    }, 1000);
                } else {
                    console.log(data);
                    siteAjaxAlert(1, data);
                }
            },
            error: function (err) {
                console.log('Errorerrorerrorerror', err);
                siteAjaxAlert(0, err);
            },
        });
    });
}


function siteServerSideDatatable(tableID, params) {
    if (tableID !== "") {
      let url;
      if (tableID.charAt(0) === "#") {
        if (jQuery(tableID).attr("data-loadurl") != undefined) {
          url = jQuery(tableID).attr("data-loadurl");
        }
      } else {
        if (jQuery("#" + tableID).attr("data-loadurl") != undefined) {
          url = jQuery("#" + tableID).attr("data-loadurl");
        }
      }
  
      let args = {
        lengthMenu: [
          [10, 25, 50, 100],
          [10, 25, 50, 100],
        ],
        info: true,
        paging: true,
        ordering: true,
        responsive: false,
        // bStateSave: true,
        serverSide: true,
        ajax: url,
      };
  
      let table;
      if (tableID.charAt(0) === "#") {
        table = jQuery(tableID).DataTable(Object.assign(args, params));
      } else {
        table = jQuery("#" + tableID).DataTable(Object.assign(args, params));
      }
      return table;
    }
  }


function deleteRecord(endpoint, itemId, containerId) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `${endpoint}`,
                type: 'POST',
                data: {
                    id: itemId
                },
                success: function (response) {
                    $('#crud-table').DataTable().ajax.reload();
                    if (containerId != undefined) {
                        $('#' + containerId).fadeOut('slow', function () {
                            $(this).remove();
                        });
                    }
                },
                error: function (xhr, status, error) {
                    Swal.fire(
                        'Error!',
                        'An error occurred while deleting the item.',
                        'error'
                    );
                }
            });
        }
    });
}

function moveToFeed(itemId, tag, type) {
    var url = `/admin/feed/add`;
    $.ajax({
        url: url,
        method: "POST",
        data: {
            itemId: itemId,
            tag: tag,
            type: type
        },
        dataType: "JSON",
        success: function (data) {
            siteAjaxAlert(1, data, 1);
        },
        error: function (err) {
            siteAjaxAlert(0, err);
        },
    });
}
function addToNewAndTrending(itemId) {
    var url = `/admin/music/add-to-new-and-trending`;
    $.ajax({
        url: url,
        method: "POST",
        data: {
            musicId: itemId
        },
        dataType: "JSON",
        success: function (data) {
            siteAjaxAlert(1, data, 1);
            $('#crud-table').DataTable().ajax.reload();
        },
        error: function (err) {
            siteAjaxAlert(0, err);
        },
    });
}

function addToRead(itemId, tag, type) {
    var url = `/admin/read-of-the-day/add`;
    $.ajax({
        url: url,
        method: "POST",
        data: {
            itemId: itemId,
            tag: tag,
            type: type
        },
        dataType: "JSON",
        success: function (data) {
            siteAjaxAlert(1, data, 1);
        },
        error: function (err) {
            siteAjaxAlert(0, err);
        },
    });
}

function addToQuote(itemId, tag, type) {
    var url = `/admin/quote-of-the-day/add`;
    $.ajax({
        url: url,
        method: "POST",
        data: {
            itemId: itemId,
            tag: tag,
            type: type
        },
        dataType: "JSON",
        success: function (data) {
            siteAjaxAlert(1, data, 1);
        },
        error: function (err) {
            siteAjaxAlert(0, err);
        },
    });
}
function subCategory(categoryId) {
    var url = `/admin/music/sub-category`;
    $.ajax({
        url: url,
        method: "POST",
        data: {
            categoryId: categoryId,
        },
        dataType: "JSON",
        success: function (data) {
            $('#subCategoryDropdown').empty();
            data.subCategories.forEach(function (subCategory) {
                var option = $('<option>', {
                    value: subCategory.category_id,
                    text: subCategory.name
                });
                $('#subCategoryDropdown').append(option);
            });
            if (data.subCategories.length > 0) {
                $('#subCategoryRow').show();
            } else {
                $('#subCategoryRow').hide();
            }
        },
        error: function (err) {
            siteAjaxAlert(0, err);
        },
    });
}
function applyDates(type, eles) {
    if (eles.length) {
        if (type == "datetime") {
            eles.bootstrapMaterialDatePicker({
                format: "DD-MM-YYYY HH:mm",
                clearButton: true,
                weekStart: 1,
                minDate: new Date()
            });
        } else if (type == "date") {
            eles.bootstrapMaterialDatePicker({
                format: "MM-DD-YYYY",
                clearButton: true,
                weekStart: 1,
                time: false,
            });
        } else if (type == "time") {
            eles.bootstrapMaterialDatePicker({
                format: "HH:mm",
                clearButton: true,
                date: false,
            });
        } else if (type == "minToday") {
            eles.bootstrapMaterialDatePicker({
                format: "DD-MM-YYYY",
                clearButton: true,
                weekStart: 1,
                time: false,
                minDate: new Date()
            });
        }
    }
}

$("body").on("focus", ".datetimepicker", function () {
    applyDates("datetime", jQuery(".datetimepicker"));
});
$("body").on("focus", ".datepicker", function () {
    applyDates("date", jQuery(".datepicker"));
});
$("body").on("focus", ".timepicker", function () {
    applyDates("time", jQuery(".timepicker"));
});
$("body").on("focus", ".mindatepicker", function () {
    applyDates("minToday", jQuery(".mindatepicker"));
});

if (jQuery(".txteditor").length) {
    jQuery(".txteditor").summernote({
        height: 150,
    });
}

function funAddContent() {
    var $div = jQuery('#sampleContentRow').clone();
    $div.removeClass('d-none');
    $div.find('.cls-text-content').attr('name', 'image[]');
    $div.find('.cls-image-content').attr('name', 'description[]');
    $div.appendTo(jQuery('#listOfContent'));
}

function funRemoveContent(ele) {
    jQuery(ele).closest('.cls-row-content').remove();
}
jQuery(document).ready(function () {
    if (!jQuery('#listOfContent .cls-row-content').length) {
        funAddContent()
    }
});
function previewImage(event, previewId) {
    const files = event.target.files;
    const output = document.getElementById(previewId);
    output.innerHTML = '<div class="form-group d-flex flex-wrap"></div>';
    const imagesContainer = output.querySelector('.form-group');
    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = function () {
            imagesContainer.innerHTML += `<div class="mr-2"><img src="${reader.result}" height="100px" width="120px" alt="Preview"></div>`;
        };
        reader.readAsDataURL(files[i]);
    }
}
function previewAudio(event, previewId) {
    const reader = new FileReader();
    reader.onload = function () {
        const output = document.getElementById(previewId);
        output.innerHTML = `<audio controls class="mt-2">
                            <source src="${reader.result}" type="audio/mp3">
                            Your browser does not support the audio element.
                          </audio>`;
    };
    reader.readAsDataURL(event.target.files[0]);
}
function toggleAddImagesRow() {
    var addImagesRow = document.getElementById('addImagesRow');
    if (addImagesRow.style.display === 'none') {
        addImagesRow.style.display = 'block';
    } else {
        addImagesRow.style.display = 'none';
    }
}