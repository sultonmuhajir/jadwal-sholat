const tgl = new Date().toISOString().slice(0, 10).split("-");


function jadwalSholat(kota) {
   const tittle = kota.charAt(0).toUpperCase() + kota.slice(1);
   document.querySelector("h1").innerHTML = `${tittle} - ${tgl[1]}/${tgl[0]}`;
   fetch(`https://raw.githubusercontent.com/lakuapik/jadwalsholatorg/master/adzan/${kota}/${tgl[0]}/${tgl[1]}.json`)
      .then(res => res.json())
      .then(data => {
         let dataJadwal = ''
         data.forEach(el => {
            dataJadwal += `<tr>
            <td> ${el.tanggal.split("-").reverse().join("/")} </td>
            <td> ${el.imsyak} </td>
            <td> ${el.shubuh} </td>
            <td> ${el.terbit} </td>
            <td> ${el.dhuha} </td>
            <td> ${el.dzuhur} </td>
            <td> ${el.ashr} </td>
            <td> ${el.magrib} </td>
            <td> ${el.isya} </td>
            </tr>`
         })
         document.querySelector("tbody").innerHTML = dataJadwal;
      });
}
jadwalSholat('bangkalan');


fetch('https://raw.githubusercontent.com/lakuapik/jadwalsholatorg/master/kota.json')
   .then(res => res.json())
   .then(data => {
      let dataKota = ''
      data.forEach(el => {
         const cityTittle = el.charAt(0).toUpperCase() + el.slice(1);
         if (el == 'bangkalan') {
            dataKota += `<option value=${el} selected> ${cityTittle} </option>`
         } else {
            dataKota += `<option value=${el}> ${cityTittle} </option>`
         }
      });
      document.querySelector("select").innerHTML = dataKota
   })


document.querySelector("select").addEventListener("change", function () {
   let citySelected = document.querySelector("select").value;
   document.querySelector("tbody").innerHTML = '';
   jadwalSholat(citySelected);
});