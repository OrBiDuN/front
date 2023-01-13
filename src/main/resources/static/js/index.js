
function getTable(worker){
    var daterange = document.getElementsByClassName("daterange");
}
function dialog_button(id){
    ocket.on('loginInServer',function(data){
        $('.sideDiv').attr('hidden', false);
    });
}
/*function downloadDoctor(){
    $.ajax({
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        url: 'http://172.16.0.251:8081/api/city/cities',
        header :'Content-Type: application/json; charset=utf8',
        success: function(jsondata){
            try{
                var i =0;
                while (1==1){
                    var jso = jsondata[i];
                    var ol = document.getElementById("worker");
                    let liFirst = document.createElement('a');
                    liFirst.setAttribute("id", jso.id);
                    liFirst.setAttribute("class", "list-group-item ");
                    liFirst.innerHTML = jso.name;
                    ol.prepend(liFirst);
                    i++;

                }
            }

            catch (e) {
                const list_group_item = document.getElementById('worker').querySelectorAll('.list-group-item');
                const classntselected = "list-group-item list-group-item-primary";
                const classntnoselected = "list-group-item";
                list_group_item.forEach(element => element.addEventListener('click', e => {
                    if(element.className !== classntselected){
                        downloadClinickForCity(true,element.id,0);
                        element.setAttribute("class",classntselected);
                    }else{
                        downloadClinickForCity(false, element.id,0);
                        element.setAttribute("class",classntnoselected)
                    }
                }))
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus); console.log("Error: " + errorThrown);
        }
    })
}*/
function on_target_meny_doc(){
    document.addEventListener('click', function(e) {
        if (!e.target.classList.contains('clinic_on_target_doc')) { return }
        let data = document.getElementById('constrained');
        let id = e.target.id;
        id = id.split('_');
        console.log(id);
        if(data.value != ''){
            let start_date = data.value.split(',')[0];
            let end_date = data.value.split(',');
            end_date = end_date[end_date.length-1];
            start_date=start_date.split('.');
            start_date = start_date[2] + '-' + start_date[1] + '-' + start_date[0];
            end_date = end_date.split('.');
            end_date = end_date[2] + '-' + end_date[1] + '-' + end_date[0];
            $.ajax({
                type: 'GET',
                crossDomain: true,
                dataType: 'json',
                async: false,
                url: 'http://172.16.0.251:8081/api/schedule/doctor-schedule?doctor=' + id[5]
                    + '&clinic=' + id[1]
                    + '&end-date=' + end_date
                    + '&start-date=' + start_date,
                data: {
                },
                header :'Content-Type: application/json; charset=utf8',
                success: function(jsondata){
                    if(jsondata.length == 0){
                        alert('Запись к этому врачу не доступна');
                    }else {
                        console.log(jsondata);
                        console.log(document.getElementById(e.target.id).innerHTML);
                        let doc = document.getElementsByClassName('input_hidden_all_info_selected')[0];
                        let el = document.createElement('input');
                        el.setAttribute('class','input_hidden_all_info_selected_doctor_selected');
                        el.innerHTML = document.getElementById(e.target.id).innerHTML;
                        if(document.getElementById('input_hidden_all_info_selected_doctor_selected') == null){
                            doc.appendChild(el);
                        }else{
                            document.getElementById('input_hidden_all_info_selected_doctor_selected').remove();
                            doc.appendChild(el);
                        }
                        table_form_add(jsondata,document.getElementById(e.target.id).innerHTML);
                    }


                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log("Status: " + textStatus); console.log("Error: " + errorThrown);
                }
            })
        }else {
            alert('Виберите диапазон дат');
        }
    });
}
function on_target_meny_clinic(){
    document.addEventListener('click', function(e) {
        if (!e.target.classList.contains('clinic_on_target_clinic')) { return }
        let doc = document.getElementsByClassName(e.target.id + '_spec')[0];
        if(doc.getAttribute('hidden')=='hidden'){
            if(document.getElementById('constrained').value != ''){
                doc.removeAttribute('hidden');
 /*               let id = e.target.id;
                id = id.split('_');
                let i = 0;
                let data = document.getElementById('constrained');
                let t = document.getElementsByClassName('clinicid_'+id[1]+'_spec')[0].getElementsByClassName('clinic_on_target_doc').length;
                let all_doc= 0;
                while (i!=t){
                    let dc = document.getElementsByClassName('clinicid_'+id[1]+'_spec')[0];
                    let start_date = data.value.split(',')[0];
                    let end_date = data.value.split(',');
                    end_date = end_date[end_date.length-1];
                    start_date=start_date.split('.');
                    start_date = start_date[2] + '-' + start_date[1] + '-' + start_date[0];
                    end_date = end_date.split('.');
                    end_date = end_date[2] + '-' + end_date[1] + '-' + end_date[0];
                    dc = dc.getElementsByClassName('clinic_on_target_doc')[i].getAttribute('id').split('_');
                    console.log('http://172.16.0.251:8081/api/schedule/doctor-schedule?doctor=' + dc[5]
                        + '&clinic=' + dc[1]
                        + '&end-date=' + end_date
                        + '&start-date=' + start_date);
                    $.ajax({
                        type: 'GET',
                        crossDomain: true,
                        dataType: 'json',
                        async: true,
                        url: 'http://172.16.0.251:8081/api/schedule/doctor-schedule?doctor=' + id[1]
                            + '&clinic=' + dc[5]
                            + '&end-date=' + end_date
                            + '&start-date=' + start_date,
                        data: {
                        },
                        header :'Content-Type: application/json; charset=utf8',
                        success: function(jsondata_fsd){
                            console.log(jsondata_fsd);
                            if(jsondata_fsd == ''){
                                console.log(jsondata_fsd);
                                console.log('   null   ')
                                all_doc++;

                                if(i+1 == t){
                                    console.log(i+1 + ' / ' + t);
                                    if(t == all_doc){
                                        alert('Не к одному врачу данной клиники запись не доступна');
                                    }else {
                                        doc.removeAttribute('hidden');
                                    }
                                }else{
                                }
                            }else{
                                console.log('not null');
                            }
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            console.log("Status: " + textStatus); console.log("Error: " + errorThrown);
                        }
                    })
                    i++;
                }*/

            }else {
                alert('Укажите диапазон дат');
            }
        }else {
            doc.setAttribute('hidden','hidden');
        }
    });
}
function downloadClinikAll(){
    $.ajax({
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        async:true,
        url: 'http://172.16.0.251:8081/api/city/cities',
        header :'Content-Type: application/json; charset=utf8',
        success: function(jsondata) {
            let i = 0;
            while(i!=jsondata.length){
                let insertCity = document.getElementById('worker');
                let appChi = document.createElement('div');
                appChi.setAttribute('class','cityId_'+jsondata[i].id);
                insertCity.appendChild(appChi);
                insertCity = document.getElementsByClassName('cityId_'+jsondata[i].id)[0];
                appChi = document.createElement('h4');
                appChi.setAttribute('id','cityId_'+jsondata[i].id);
                appChi.innerHTML = jsondata[i].name;
                insertCity.appendChild(appChi);

                downloadClinicForCityV2(jsondata[i].id);

                i++;
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus); console.log("Error: " + errorThrown);
        }
    })
    on_target_meny_clinic();
    on_target_meny_doc();
}
function downloadClinicForCityV2(id){
    $.ajax({
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        async: true,
        url: 'http://172.16.0.251:8081/api/clinic/clinics-by-city',
        data: {
            cityId: id
        },
        header :'Content-Type: application/json; charset=utf8',
        success: function(jsondata_clinic){
            let a = 0;
            while(a!=jsondata_clinic.length){
                if(jsondata_clinic.length == 1){
                    let cityapp = document.getElementsByClassName('cityId_'+id)[0];
                    let appChi = document.createElement('div')
                    appChi.setAttribute('class','clinicid_'+jsondata_clinic[a].id);
                    cityapp.appendChild(appChi);
                    cityapp = document.getElementsByClassName('clinicid_'+jsondata_clinic[a].id)[0];
                    appChi = document.createElement('h5');
                    appChi.setAttribute('id', 'clinicid_'+jsondata_clinic[a].id);
                    appChi.setAttribute('style','padding-left: 15px;');
                    appChi.setAttribute('class','clinic_on_target_clinic');
                    appChi.innerHTML = jsondata_clinic[a].name;
                    cityapp.appendChild(appChi);

                    downloadSpecialForClinik(jsondata_clinic[a].id);

                    a++;
                }else {
                    let cityapp = document.getElementsByClassName('cityId_'+id)[0];
                    let appChi = document.createElement('div')
                    appChi.setAttribute('class','clinicid_'+jsondata_clinic[a].id);
                    cityapp.appendChild(appChi);
                    cityapp = document.getElementsByClassName('clinicid_'+jsondata_clinic[a].id)[0];
                    appChi = document.createElement('h5');
                    appChi.setAttribute('id', 'clinicid_'+jsondata_clinic[a].id);
                    appChi.setAttribute('class','clinic_on_target_clinic');
                    appChi.setAttribute('style','padding-left: 15px;');
                    appChi.innerHTML = jsondata_clinic[a].name;
                    cityapp.appendChild(appChi);

                    downloadSpecialForClinik(jsondata_clinic[a].id);

                    a++;
                }
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus); console.log("Error: " + errorThrown);
        }
    })
}

function downloadSpecialForClinik(id){
    $.ajax({
        type: 'GET',
        crossDomain: false,
        dataType: 'json',
        async: true,
        url: 'http://172.16.0.251:8081/api/specialization/specializations-by-clinic',
        data: {
            clinicId: id
        },
        header :'Content-Type: application/json; charset=utf8',
        success: function(jsondata_spec){
            let t=0;
            let adddoc = document.getElementsByClassName('clinicid_'+id)[0];
            let appChi = document.createElement('div');
            appChi.setAttribute('class','clinicid_'+id+'_spec');
            appChi.setAttribute('hidden','hidden');
            adddoc.appendChild(appChi);

            while (t!=jsondata_spec.length){
                adddoc = document.getElementsByClassName('clinicid_'+id+'_spec')[0];
                appChi = document.createElement('div');
                appChi.setAttribute('class','clinicId_'+id+'_specId_'+jsondata_spec[t].id);
                adddoc.appendChild(appChi);
                adddoc = document.getElementsByClassName('clinicId_'+id+'_specId_'+jsondata_spec[t].id)[0];
                appChi = document.createElement('h5');
                appChi.setAttribute('style','padding-left: 30px;');
                appChi.setAttribute('id','clinicId_'+id+'_specId_'+jsondata_spec[t].id);
                appChi.innerHTML = jsondata_spec[t].name;
                adddoc.appendChild(appChi);
                downloadSpecForDoc(id,jsondata_spec[t].id);

                t++;
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus); console.log("Error: " + errorThrown);
        }
    })
}

function downloadSpecForDoc(clinic_id, id_spec){
    $.ajax({
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        async: true,
        url: 'http://172.16.0.251:8081/api/doctor/doctors-by-clinic-and-specialization',
        data: {
            clinicId : clinic_id,
            specializationId: id_spec
        },
        header :'Content-Type: application/json; charset=utf8',
        success: function(jsondata_doc){
            let ii= 0;
            while(ii!=jsondata_doc.length){
                let docadd=document.getElementsByClassName('clinicId_'+clinic_id+'_specId_'+ id_spec)[0];
                let appChi=document.createElement('div');
                appChi.setAttribute('class','clinicId_'+clinic_id+'_specId_'+ id_spec+'_docid_'+jsondata_doc[ii].id);
                docadd.appendChild(appChi);
                docadd=document.getElementsByClassName('clinicId_'+clinic_id+'_specId_'+ id_spec+'_docid_'+jsondata_doc[ii].id)[0];
                appChi = document.createElement('h5');
                appChi.setAttribute('id','clinicId_'+clinic_id+'_specId_'+ id_spec+'_docid_'+jsondata_doc[ii].id);
                appChi.setAttribute('class','clinic_on_target_doc');
                appChi.setAttribute('style','padding-left:45px');
                appChi.innerHTML = jsondata_doc[ii].fio;
                docadd.appendChild(appChi);
                ii++;
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log("Status: " + textStatus); console.log("Error: " + errorThrown);
        }
    })
}

function downloadClinickForCity(close ,id, section){
    let doc = document.getElementsByClassName('input_hidden_all_info_selected')[0];
    switch (section) {
        case 0:
            break;
        case 1:
            break;
        case 2:
            let City_id = document.getElementById('city_id_dialog_search_spec').value;
            console.log("Open :" + close + "   ID: " + id + "   Type: " + section + "   City_id: "+City_id);
            if(close){

                let input = document.createElement('input');
                input.setAttribute('hidden','hidden');
                input.setAttribute('class','special_selected');
                input.innerHTML = id;
                doc.appendChild(input);

                $.ajax({
                    type: 'GET',
                    crossDomain: true,
                    dataType: 'json',
                    async: false,
                    url: 'http://172.16.0.251:8081/api/doctor/doctors-by-clinic-and-specialization',
                    data: {
                        clinicId : City_id,
                        specializationId: id
                    },
                    header :'Content-Type: application/json; charset=utf8',
                    success: function(jsondata){
                        console.log(jsondata);

                        //Проверка на пустую запись у врача
                        try {

                            if(document.getElementById('constrained').getAttribute('value') != ''){
                                console.log(document.getElementById('constrained').getAttribute('value'));
                                try {
                                    var t = 0;
                                    var sc = 0;
                                    let date = document.getElementById('constrained').value;
                                    console.log(date.length);
                                    if(date.length == 10){
                                        date = date.split('.');
                                        date = date[2] + '-' + date[1] + '-' + date[0];
                                        console.log(date);
                                        while(1==1){

                                            console.log(jsondata[t].fio);
                                            $.ajax({
                                                type: 'GET',
                                                crossDomain: true,
                                                dataType: 'json',
                                                async: false,
                                                url: 'http://172.16.0.251:8081/api/schedule/doctor-schedule?doctor=' + jsondata[t].id
                                                    + '&clinic=' + jsondata[t].clinic_id
                                                    + '&end-date='+ date
                                                    + '&start-date=' + date,
                                                data: {
                                                },
                                                header :'Content-Type: application/json; charset=utf8',
                                                success: function(jsondata_suc){
                                                    console.log(jsondata_suc);
                                                    if(jsondata_suc.length == 0){
                                                        console.log('null pointer ' + jsondata[t].fio);
                                                    }else {
                                                        sc++;
                                                        console.log('NOT  ' + jsondata[t].fio);
                                                        var ol = document.getElementById('dialog_select');
                                                        ol.setAttribute('name',id);
                                                        let liFirst = document.createElement('div');
                                                        liFirst.setAttribute('class','list-group');
                                                        liFirst.setAttribute('style','overflow-y: scroll;height: 100%;width: 200px;/* margin: 0px 0px 0px 10px; */position: absolute;top: 126px;margin-left: 221px;');
                                                        liFirst.setAttribute('id','list-group-special-doctors');
                                                        ol.appendChild(liFirst);
                                                        liFirst = document.createElement('input');
                                                        liFirst.setAttribute('hidden','hidden');
                                                        liFirst.setAttribute('id','spec_id_dialog_search_spec');
                                                        liFirst.setAttribute('value',id);
                                                        ol.appendChild(liFirst);
                                                        try{
                                                            var i =0;
                                                            while (1==1){
                                                                var jso = jsondata[i];
                                                                ol = document.getElementById('list-group-special-doctors');
                                                                liFirst = document.createElement('a');
                                                                liFirst.setAttribute("id", jso.id);
                                                                liFirst.setAttribute("class", "list-group-item ");
                                                                liFirst.setAttribute("value",jso.fio);
                                                                liFirst.innerHTML = jso.fio;
                                                                ol.prepend(liFirst);
                                                                i++;
                                                            }
                                                        }catch (e) {
                                                            const list_group_item = document.getElementById('list-group-special-doctors').querySelectorAll('.list-group-item');
                                                            const classntselected = "list-group-item list-group-item-primary";
                                                            const classntnoselected = "list-group-item";
                                                            list_group_item.forEach(element => element.addEventListener('click', e => {
                                                                if(element.className !== classntselected){
                                                                    downloadClinickForCity(true,element.id, 3);
                                                                    element.setAttribute("class",classntselected);
                                                                    var inp = document.createElement('input');
                                                                    inp.setAttribute('hidden','hidden');
                                                                    inp.setAttribute('id', 'doctors_fio_by_id_' +id);
                                                                    inp.appendChild(document.getElementById('list-group-special-doctors'));
                                                                }else{
                                                                    downloadClinickForCity(false, element.id, 3);
                                                                    element.setAttribute("class",classntnoselected)
                                                                    $('#spec_id_dialog_search_spec').remove();
                                                                }
                                                            }))
                                                        }
                                                    }

                                                },
                                                error: function(XMLHttpRequest, textStatus, errorThrown) {
                                                    console.log("Status: " + textStatus); console.log("Error: " + errorThrown);
                                                }
                                            })
                                            t++;
                                        }
                                    }else{
                                        date = date.split(',');
                                        let start_date = date[0].split('.');
                                        start_date = start_date[2] + '-' + start_date[1] + '-' + start_date[0];
                                        console.log(start_date);
                                        let end_date = date[date.length-1].split('.');
                                        end_date = end_date[2] + '-' + end_date[1] + '-' + end_date[0];
                                        console.log(end_date)
                                        while(1==1){

                                            console.log(jsondata[t].fio);
                                            $.ajax({
                                                type: 'GET',
                                                crossDomain: true,
                                                dataType: 'json',
                                                async: false,
                                                url: 'http://172.16.0.251:8081/api/schedule/doctor-schedule?doctor=' + jsondata[t].id
                                                    + '&clinic=' + jsondata[t].clinic_id
                                                    + '&end-date='+ end_date
                                                    + '&start-date=' + start_date,
                                                data: {
                                                },
                                                header :'Content-Type: application/json; charset=utf8',
                                                success: function(jsondata_suc){
                                                    console.log(jsondata_suc);
                                                    if(jsondata_suc.length == 0){
                                                        console.log('null pointer ' + jsondata[t].fio);
                                                    }else {
                                                        sc++;
                                                        console.log('NOT  ' + jsondata[t].fio);
                                                        var ol = document.getElementById('dialog_select');
                                                        ol.setAttribute('name',id);
                                                        let liFirst = document.createElement('div');
                                                        liFirst.setAttribute('class','list-group');
                                                        liFirst.setAttribute('style','overflow-y: scroll;height: 340px;width: 200px;/* margin: 0px 0px 0px 10px; */position: absolute;top: 126px;margin-left: 221px;');
                                                        liFirst.setAttribute('id','list-group-special-doctors');
                                                        ol.appendChild(liFirst);
                                                        liFirst = document.createElement('input');
                                                        liFirst.setAttribute('hidden','hidden');
                                                        liFirst.setAttribute('id','spec_id_dialog_search_spec');
                                                        liFirst.setAttribute('value',id);
                                                        ol.appendChild(liFirst);
                                                        try{
                                                            var i =0;
                                                            while (1==1){
                                                                var jso = jsondata[i];
                                                                ol = document.getElementById('list-group-special-doctors');
                                                                liFirst = document.createElement('a');
                                                                liFirst.setAttribute("id", jso.id);
                                                                liFirst.setAttribute("class", "list-group-item ");
                                                                liFirst.setAttribute("value",jso.fio);
                                                                liFirst.innerHTML = jso.fio;
                                                                ol.prepend(liFirst);
                                                                i++;
                                                            }
                                                        }catch (e) {
                                                            const list_group_item = document.getElementById('list-group-special-doctors').querySelectorAll('.list-group-item');
                                                            const classntselected = "list-group-item list-group-item-primary";
                                                            const classntnoselected = "list-group-item";
                                                            list_group_item.forEach(element => element.addEventListener('click', e => {
                                                                if(element.className !== classntselected){
                                                                    downloadClinickForCity(true,element.id, 3);
                                                                    element.setAttribute("class",classntselected);
                                                                    var inp = document.createElement('input');
                                                                    inp.setAttribute('hidden','hidden');
                                                                    inp.setAttribute('id', 'doctors_fio_by_id_' +id);

                                                                    inp.appendChild(document.getElementById('list-group-special-doctors'));
                                                                }else{
                                                                    downloadClinickForCity(false, element.id, 3);
                                                                    element.setAttribute("class",classntnoselected)
                                                                    $('#spec_id_dialog_search_spec').remove();
                                                                }
                                                            }))
                                                        }
                                                    }

                                                },
                                                error: function(XMLHttpRequest, textStatus, errorThrown) {
                                                    console.log("Status: " + textStatus); console.log("Error: " + errorThrown);
                                                }
                                            })
                                            t++;
                                        }
                                    }
                                    t++;
                                }catch (e){
                                    if(sc == 0) {
                                        alert('Запись не возможна к любому врачу по данной специальности');
                                    }
                                }

                            }else{

                                alert('Укажите пожалуйста диапозон дат');
                            }

                        }catch (e){
                            console.log(e);
                        }
                    },

                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        console.log("Status: " + textStatus); console.log("Error: " + errorThrown);
                    }
                })
            }else{
                $('#list-group-special-doctors').remove();
                doc.getElementsByClassName('special_selected')[0].remove();
            }
            break;
        case 3:
            let input = document.createElement('input');
            input.setAttribute('hidden','hidden');
            input.setAttribute('class','doctor_selected');
            input.setAttribute('value',document.getElementById(id).innerHTML);
            input.innerHTML = id;
            doc.appendChild(input);

            const dialog_add_exit = document.querySelectorAll('.dialog_add_exit');
            let date = document.getElementById('constrained').value;
            if(date.length == 10){
                date = date.split('.');
                date = date[2] + '-' + date[1] + '-' + date[0];
                console.log(date);
                let clinic = doc.getElementsByClassName('medical_selected')[0].getAttribute('value');
                console.log(clinic);
                $.ajax({
                    type: 'GET',
                    crossDomain: true,
                    dataType: 'json',
                    async: false,
                    url: 'http://172.16.0.251:8081/api/schedule/doctor-schedule?doctor=' + id
                        + '&clinic=' + clinic
                        + '&end-date=' + date
                        + '&start-date=' + date,
                    data: {
                    },
                    header :'Content-Type: application/json; charset=utf8',
                    success: function(jsondata){
                        console.log(jsondata);

                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        console.log("Status: " + textStatus); console.log("Error: " + errorThrown);
                    }
                })
            }else{
                date = date.split(',');
                console.log(date);
                let start_date = date[0].split('.');
                start_date = start_date[2] + '-' + start_date[1] + '-' + start_date[0];
                console.log(start_date);
                let end_date = date[date.length-1].split('.');
                end_date = end_date[2] + '-' + end_date[1] + '-' + end_date[0];
                console.log(end_date)
                let clinic = doc.getElementsByClassName('medical_selected')[0].getAttribute('value');
                console.log(clinic.toString());
                $.ajax({
                    type: 'GET',
                    crossDomain: true,
                    dataType: 'json',
                    async: false,
                    url: 'http://172.16.0.251:8081/api/schedule/doctor-schedule?doctor=' + id
                        + '&clinic=' + clinic.toString()
                        + '&end-date=' + end_date
                        + '&start-date=' + start_date,
                    data: {
                    },
                    header :'Content-Type: application/json; charset=utf8',
                    success: function(jsondata){
                        table_form_add(jsondata, document.getElementById(id).innerHTML);
                        $('.dialog_add').attr('hidden', true);
                        document.getElementById('dialog_at').innerHTML ="";
                        document.getElementById('dialog_select').innerHTML="";


                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        console.log("Status: " + textStatus); console.log("Error: " + errorThrown);
                    }
                })
            }

            break;
    }
}
function table_form_add(jsondata, fio){
    let doc = document.getElementsByClassName('input_hidden_all_info_selected')[0].getElementsByClassName('table_act')[0].getAttribute('value');
    let test = 0;

    if(doc.toString() == 'off'){
        document.getElementsByClassName('input_hidden_all_info_selected')[0].getElementsByClassName('table_act')[0].setAttribute('value', 'on');
        let main_table = document.getElementsByClassName('main_table_name')[0];
        let main_table_th = document.createElement('th');
        main_table_th.innerHTML = fio;
        main_table.appendChild(main_table_th);

        main_table = document.getElementsByClassName('main_table_date')[0];
        main_table_th = document.createElement('th');
        main_table_th.setAttribute('rowspan', '2');
        main_table_th.setAttribute('style','width: 75px;');
        main_table_th.innerHTML= ':30';
        main_table.appendChild(main_table_th);


        for(let i = 0; i< jsondata.length;i++){
            let date_app = jsondata[i].date;
            if(document.getElementById(date_app) == undefined){
                test++;
                main_table = document.getElementsByClassName('main_table_date')[0];
                main_table_th = document.createElement('th');
                main_table_th.setAttribute('id', date_app);
                main_table_th.setAttribute('class','date_app_child');
                main_table_th.innerHTML= date_app;
                main_table.appendChild(main_table_th);
                let time_app = jsondata[i].time_name;
                if(document.getElementById(time_app) == undefined){
                    let table_date_inification_for_doctors = document.getElementsByClassName('table_date_inification_for_doctors')[0];
                    let table_date_inification_for_doctors_tab = document.createElement('tr');
                    table_date_inification_for_doctors_tab.setAttribute('id','tr_' + time_app);
                    table_date_inification_for_doctors.appendChild(table_date_inification_for_doctors_tab);
                    table_date_inification_for_doctors_tab = document.createElement('th');
                    table_date_inification_for_doctors_tab.setAttribute('id', time_app);
                    table_date_inification_for_doctors_tab.innerHTML = time_app;
                    document.getElementById('tr_'+time_app).appendChild(table_date_inification_for_doctors_tab);

                    table_date_inification_for_doctors_tab = document.createElement('th');
                    table_date_inification_for_doctors_tab.setAttribute('id', date_app+'_'+time_app+'_'+ document.getElementsByClassName('input_hidden_all_info_selected_doctor_selected')[0].value+'_' + jsondata[i].id);

                    if(jsondata[i].status_name == 'Доступен'){
                        table_date_inification_for_doctors_tab.setAttribute('style','background-color: lightgreen;border-radius: 25px;');
                        document.getElementById('tr_'+time_app).appendChild(table_date_inification_for_doctors_tab);
                    }else if(jsondata[i].status_name == 'Записан'){
                        console.log('Записан');
                        table_date_inification_for_doctors_tab.setAttribute('style','background-color: indianred;border-radius: 25px;');
                        table_date_inification_for_doctors_tab.innerHTML = jsondata[i].patient_fio + '\n' + 'comment';
                        document.getElementById('tr_'+time_app).appendChild(table_date_inification_for_doctors_tab);
                    }else if(jsondata[i].status_name == 'Звонок для уточнения даты записи'){
                        console.log('Звонок для уточнения даты записи');
                        table_date_inification_for_doctors_tab.setAttribute('style','background-color: yellow;border-radius: 25px;');
                        table_date_inification_for_doctors_tab.innerHTML = jsondata[i].patient_fio + '\n' + 'comment';
                        document.getElementById('tr_'+time_app).appendChild(table_date_inification_for_doctors_tab);
                    }
                    document.getElementById('tr_'+time_app).appendChild(table_date_inification_for_doctors_tab);

                }else{
                    console.log(jsondata[i].data);
                }
            }else {
                let time_app = jsondata[i].time_name;
                let table_date_inification_for_doctors = document.getElementsByClassName('table_date_inification_for_doctors')[0];
                let table_date_inification_for_doctors_tab = document.createElement('tr');
                if(document.getElementById(time_app) == undefined){
                    table_date_inification_for_doctors_tab.setAttribute('id','tr_' + time_app);
                    table_date_inification_for_doctors.appendChild(table_date_inification_for_doctors_tab);
                    table_date_inification_for_doctors_tab = document.createElement('th');
                    table_date_inification_for_doctors_tab.setAttribute('id', time_app);
                    table_date_inification_for_doctors_tab.innerHTML = time_app;
                    document.getElementById('tr_'+time_app).appendChild(table_date_inification_for_doctors_tab);
                }else{
                    console.log('else time');
                }
                table_date_inification_for_doctors_tab = document.createElement('th');
                table_date_inification_for_doctors_tab.setAttribute('id', date_app+'_'+time_app+'_'+ document.getElementsByClassName('input_hidden_all_info_selected_doctor_selected')[0].value+ '_'+ jsondata[i].id);
                if(jsondata[i].status_name == 'Доступен'){
                    table_date_inification_for_doctors_tab.setAttribute('style','background-color: lightgreen;border-radius: 25px;');
                    document.getElementById('tr_'+time_app).appendChild(table_date_inification_for_doctors_tab);
                }else if(jsondata[i].status_name == 'Записан'){
                    console.log('asd')
                    table_date_inification_for_doctors_tab.setAttribute('style','background-color: indianred;border-radius: 25px;');
                    document.getElementById('tr_'+time_app).appendChild(table_date_inification_for_doctors_tab);
                    table_date_inification_for_doctors_tab = document.createElement('h5');
                    table_date_inification_for_doctors_tab.setAttribute('class', date_app+'_'+time_app+'_'+ document.getElementsByClassName('input_hidden_all_info_selected_doctor_selected')[0].value+ '_'+ jsondata[i].id);
                    table_date_inification_for_doctors_tab.setAttribute('style','font-size:17px;');
                    table_date_inification_for_doctors_tab.innerHTML = jsondata[i].patient_fio;
                    document.getElementById(date_app+'_'+time_app+'_'+ document.getElementsByClassName('input_hidden_all_info_selected_doctor_selected')[0].value+ '_'+ jsondata[i].id).appendChild(table_date_inification_for_doctors_tab);
                    table_date_inification_for_doctors_tab = document.createElement('h5');
                    table_date_inification_for_doctors_tab.setAttribute('class', date_app+'_'+time_app+'_'+ document.getElementsByClassName('input_hidden_all_info_selected_doctor_selected')[0].value+ '_'+ jsondata[i].id);
                    table_date_inification_for_doctors_tab.setAttribute('style','font-size:13px;');
                    if(jsondata[i].comment == ''){
                        table_date_inification_for_doctors_tab.innerHTML= 'Без комментария';
                    }else{
                        table_date_inification_for_doctors_tab.innerHTML= jsondata[i].comment;
                    }
                    document.getElementById(date_app+'_'+time_app+'_'+ document.getElementsByClassName('input_hidden_all_info_selected_doctor_selected')[0].value+ '_'+ jsondata[i].id).appendChild(table_date_inification_for_doctors_tab);
                    table_date_inification_for_doctors_tab = document.createElement('input');
                    table_date_inification_for_doctors_tab.setAttribute('hidden','hidden');
                    table_date_inification_for_doctors_tab.setAttribute('class', date_app+'_'+time_app+'_'+ document.getElementsByClassName('input_hidden_all_info_selected_doctor_selected')[0].value+ '_'+ jsondata[i].id+'_input');
                    table_date_inification_for_doctors_tab.setAttribute('value',jsondata[i].patient_fio + '_'
                        + jsondata[i].patient_phone + '_'
                        + jsondata[i].status_name + '_'
                        + jsondata[i].time_name + '_'
                        + jsondata[i].date + '_'
                        + jsondata[i].patient_id + '_'
                        + jsondata[i].comment);
                    document.getElementById(date_app+'_'+time_app+'_'+ document.getElementsByClassName('input_hidden_all_info_selected_doctor_selected')[0].value+ '_'+ jsondata[i].id).appendChild(table_date_inification_for_doctors_tab);
                }else if(jsondata[i].status_name == 'Звонок для уточнения даты записи'){
                console.log('Звонок для уточнения даты записи');
                    table_date_inification_for_doctors_tab.setAttribute('style','background-color: yellow;border-radius: 25px;');
                    document.getElementById('tr_'+time_app).appendChild(table_date_inification_for_doctors_tab);
                    table_date_inification_for_doctors_tab = document.createElement('h5');
                    table_date_inification_for_doctors_tab.setAttribute('class', date_app+'_'+time_app+'_'+ document.getElementsByClassName('input_hidden_all_info_selected_doctor_selected')[0].value+ '_'+ jsondata[i].id);
                    table_date_inification_for_doctors_tab.setAttribute('style','font-size:17px;');
                    table_date_inification_for_doctors_tab.innerHTML = jsondata[i].patient_fio;
                    document.getElementById(date_app+'_'+time_app+'_'+ document.getElementsByClassName('input_hidden_all_info_selected_doctor_selected')[0].value+ '_'+ jsondata[i].id).appendChild(table_date_inification_for_doctors_tab);
                    table_date_inification_for_doctors_tab = document.createElement('h5');
                    table_date_inification_for_doctors_tab.setAttribute('class', date_app+'_'+time_app+'_'+ document.getElementsByClassName('input_hidden_all_info_selected_doctor_selected')[0].value+ '_'+ jsondata[i].id);
                    table_date_inification_for_doctors_tab.setAttribute('style','font-size:13px;');
                    if(jsondata[i].comment == ''){
                        table_date_inification_for_doctors_tab.innerHTML= 'Без комментария';
                    }else{
                        table_date_inification_for_doctors_tab.innerHTML= jsondata[i].comment;
                    }
                    document.getElementById(date_app+'_'+time_app+'_'+ document.getElementsByClassName('input_hidden_all_info_selected_doctor_selected')[0].value+ '_'+ jsondata[i].id).appendChild(table_date_inification_for_doctors_tab);
                    table_date_inification_for_doctors_tab = document.createElement('input');
                    table_date_inification_for_doctors_tab.setAttribute('hidden','hidden');
                    table_date_inification_for_doctors_tab.setAttribute('class', date_app+'_'+time_app+'_'+ document.getElementsByClassName('input_hidden_all_info_selected_doctor_selected')[0].value+ '_'+ jsondata[i].id+'_input');
                    table_date_inification_for_doctors_tab.setAttribute('value',jsondata[i].patient_fio + '_'
                        + jsondata[i].patient_phone + '_'
                        + jsondata[i].status_name + '_'
                        + jsondata[i].time_name + '_'
                        + jsondata[i].date + '_'
                        + jsondata[i].patient_id + '_'
                        + jsondata[i].comment);
                    document.getElementById(date_app+'_'+time_app+'_'+ document.getElementsByClassName('input_hidden_all_info_selected_doctor_selected')[0].value+ '_'+ jsondata[i].id).appendChild(table_date_inification_for_doctors_tab);
                table_date_inification_for_doctors_tab.innerHTML = jsondata[i].patient_fio + '\n' + 'comment';
                document.getElementById('tr_'+time_app).appendChild(table_date_inification_for_doctors_tab);
                }
                console.log(jsondata[i].status_name);


            }

        }
    }else if(doc.toString() == 'on'){
        console.log('table on');
        document.getElementsByClassName('main_table_date')[0].innerHTML = '';
        document.getElementsByClassName('main_table_name')[0].innerHTML = '';
        document.getElementsByClassName('table_date_inification_for_doctors')[0].innerHTML ='';
        document.getElementsByClassName('input_hidden_all_info_selected')[0].getElementsByClassName('table_act')[0].setAttribute('value','off');
        table_form_add(jsondata, fio);
    }
    console.log(100/test);

    let t = 0;
    while(t != test){
        let docwidth = document.getElementsByClassName('date_app_child');
        console.log(docwidth);

        docwidth[t].setAttribute('style','width:' + 100/test + '%;');
        t++;
    }

    console.log(jsondata);
    console.log(fio);
}

function createElems(id,type){
    console.log(id);
    console.log(type);
    if(type == 'background-color: lightgreen;border-radius: 25px;'){
        $('.dialog_add').attr('hidden', false);
        let doc = document.getElementById('dialog_at');
        let add = document.createElement('h3');
        add.setAttribute('value',id);
        add.setAttribute('class','dialog_add_title');
        add.innerHTML = 'Создать запись на время ' + id[1] + ' на дату ' + id[0] + " id записи " + id[3];
        doc.appendChild(add);


        doc = document.getElementById('dialog_select');
        add = document.createElement('div');
        add.setAttribute('class','dialog_select_div');
        doc.appendChild(add);
        doc = document.getElementsByClassName('dialog_select_div')[0];
        add = document.createElement('h2');
        add.setAttribute('class','dialog_add_select_h2');
        add.innerHTML = 'Телефон: '
        doc.appendChild(add);
        add = document.createElement('input');
        add.setAttribute('class','dialog_add_select_phone_patient');
        doc.appendChild(add);

        doc = document.getElementById('dialog_select');
        add = document.createElement('div');
        add.setAttribute('class','dialog_select_div');
        doc.appendChild(add);
        doc = document.getElementsByClassName('dialog_select_div')[1];
        add = document.createElement('h2');
        add.setAttribute('class','dialog_add_select_h2');
        add.innerHTML = 'ФИО: '
        doc.appendChild(add);
        add = document.createElement('input');
        add.setAttribute('class','dialog_add_select_hb_patient');
        doc.appendChild(add);

        doc = document.getElementById('dialog_select');
        add = document.createElement('div');
        add.setAttribute('class','dialog_select_div');
        doc.appendChild(add);
        doc = document.getElementsByClassName('dialog_select_div')[2];
        add = document.createElement('h2');
        add.setAttribute('class','dialog_add_select_h2');
        add.innerHTML = 'Примечание: '
        doc.appendChild(add);
        add = document.createElement('textarea');
        add.setAttribute('class','dialog_add_select_note_patient');
        doc.appendChild(add);


        doc = document.getElementById('dialog_select');
        add = document.createElement('div');
        add.setAttribute('class','dialog_select_div');
        doc.appendChild(add);
        doc = document.getElementsByClassName('dialog_select_div')[3];
        add = document.createElement('button');
        add.setAttribute('class','btn btn-primary');
        add.setAttribute('onclick','create_add()');
        add.innerHTML = 'Сохранить';
        doc.appendChild(add);

    }else if(type == 'background-color: indianred;border-radius: 25px;' || 'font-size:17px;' || 'font-size:13px;'){
        $('.dialog_add').attr('hidden', false);
        let inp = document.getElementsByClassName(id[0]+'_'+id[1]+ '_'+id[2]+'_'+id[3] + '_input')[0].getAttribute('value').split('_');
        console.log(inp);
        let doc = document.getElementById('dialog_at');
        let add = document.createElement('h3');
        add.setAttribute('value',id);
        add.setAttribute('class','dialog_add_title');
        add.innerHTML = 'Редактировать запись на время ' + id[1] + ' на дату ' + id[0] + " id записи " + id[3];
        doc.appendChild(add);


        doc = document.getElementById('dialog_select');
        add = document.createElement('div');
        add.setAttribute('class','dialog_select_div');
        doc.appendChild(add);
        doc = document.getElementsByClassName('dialog_select_div')[0];
        add = document.createElement('h2');
        add.setAttribute('class','dialog_add_select_h2');
        add.innerHTML = 'Телефон: '
        doc.appendChild(add);
        add = document.createElement('input');
        add.value = inp[1];
        add.setAttribute('class','dialog_add_select_phone_patient');
        doc.appendChild(add);

        doc = document.getElementById('dialog_select');
        add = document.createElement('div');
        add.setAttribute('class','dialog_select_div');
        doc.appendChild(add);
        doc = document.getElementsByClassName('dialog_select_div')[1];
        add = document.createElement('h2');
        add.setAttribute('class','dialog_add_select_h2');
        add.innerHTML = 'ФИО: '
        doc.appendChild(add);
        add = document.createElement('input');
        add.value = inp[0];
        add.setAttribute('class','dialog_add_select_hb_patient');
        doc.appendChild(add);

        doc = document.getElementById('dialog_select');
        add = document.createElement('div');
        add.setAttribute('class','dialog_select_div');
        doc.appendChild(add);
        doc = document.getElementsByClassName('dialog_select_div')[2];
        add = document.createElement('h2');
        add.setAttribute('class','dialog_add_select_h2');
        add.innerHTML = 'Примечание: '
        doc.appendChild(add);
        add = document.createElement('textarea');
        add.value = inp[6];
        add.setAttribute('class','dialog_add_select_note_patient');
        doc.appendChild(add);


        doc = document.getElementById('dialog_select');
        add = document.createElement('div');
        add.setAttribute('class','dialog_select_div');
        doc.appendChild(add);
        doc = document.getElementsByClassName('dialog_select_div')[3];
        add = document.createElement('button');
        add.setAttribute('class','btn btn-primary');
        add.setAttribute('onclick','create_add()');
        add.innerHTML = 'Сохранить';
        doc.appendChild(add);
        console.log('none')
    }

}
function create_add(){
    console.log('test');
    alert("Вы уверены что хотите сохранить запись пациента с ФИО: " + document.getElementsByClassName('dialog_add_select_hb_patient')[0].value + ' номером телефона: ' + document.getElementsByClassName('dialog_add_select_phone_patient')[0].value + ' и комментарием:' + document.getElementsByClassName('dialog_add_select_note_patient')[0].value);
    console.log(document.getElementsByClassName('dialog_add_select_phone_patient')[0].value);
    console.log(document.getElementsByClassName('dialog_add_select_hb_patient')[0].value);
    console.log(document.getElementsByClassName('dialog_add_select_note_patient')[0].value);
    alert('Запись успешно сохранена, можете закрывать диалоговое окно');
    //Фунция вырезанна
}

