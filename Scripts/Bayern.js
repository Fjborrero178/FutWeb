const latID =  document.getElementById('latID');
const longID = document.getElementById('longID');
const dateID = document.getElementById('dateID');
const timeID = document.getElementById('timeID');

const showData = async (equipo) => {
    fetch(`/equipo?equipo=${equipo}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    },
    ).then(response => {
        if (response.ok) {
            response.json().then(json => {
                // Obtenemos informacion de la base de datos
                const lastInfo = json[0];
                // Se coloca la informacion en los elementos seleccionados al comienzo del codigo.
                if (equipo == '7') {
                    latID.textContent = lastInfo.lat;
                    longID.textContent = lastInfo.lng;            
                    try {
                        dateID.textContent = lastInfo.date.split('T')[0];
                        timeID.textContent = lastInfo.date.split('T')[1].split('.')[0];
                    } catch (error) {
                        // console.error(error);
                    }
                } 
                const taxioption = document.getElementById('equipo').value;
                if (taxioption != 0) {
                        dateID.textContent = '';
                        timeID.textContent = '';
                        latID.textContent = '';
                        longID.textContent = '';
                        rpmID.textContent = '';                      
                    }
                });
            
        
        }
    });
}
getTaxiInfo();