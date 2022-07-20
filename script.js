const tgl = new Date().toISOString().slice(0, 10).split("-");
const judul = document.querySelector("h2");
const body = document.querySelector("tbody");
const select = document.querySelector("select");

// Fungsi mengambil data jadwal sholat dari API
function getJadwal(kota, year, month) {
   return fetch(
      `https://raw.githubusercontent.com/lakuapik/jadwalsholatorg/master/adzan/${kota}/${year}/${month}.json`
   )
      .then((res) => res.json())
      .then((data) => data);
}

// Fungsi menambahkan data ke list
function dataJadwal(data) {
   let res = "";
   data.forEach((el) => {
      res += `<tr>
            <td> ${el.tanggal.split("-").reverse().join("/")} </td>
            <td> ${el.imsyak} </td>
            <td> ${el.shubuh} </td>
            <td> ${el.terbit} </td>
            <td> ${el.dhuha} </td>
            <td> ${el.dzuhur} </td>
            <td> ${el.ashr} </td>
            <td> ${el.magrib} </td>
            <td> ${el.isya} </td>
            </tr>`;
   });
   return res;
}

// Fungsi menampilkan jadwal sholat
async function jadwalSholat(kota) {
   const title = kota.charAt(0).toUpperCase() + kota.slice(1);
   judul.innerHTML = `${title} - ${tgl[1]}/${tgl[0]}`;
   const data = await getJadwal(kota, tgl[0], tgl[1]);
   body.innerHTML = dataJadwal(data);
}

// Menampilkan daftar kota pada pilihan
fetch("https://raw.githubusercontent.com/lakuapik/jadwalsholatorg/master/kota.json")
   .then((res) => res.json())
   .then((data) => {
      let dataKota = "";
      data.forEach((el) => {
         const cityTittle = el.charAt(0).toUpperCase() + el.slice(1);
         dataKota +=
            el == "bangkalan"
               ? `<option value=${el} selected> ${cityTittle} </option>`
               : `<option value=${el}> ${cityTittle} </option>`;
      });
      select.innerHTML = dataKota;
   });

// Menampilkan jadwal sholat
jadwalSholat("bangkalan");
select.addEventListener("change", function () {
   let citySelected = select.value;
   body.innerHTML = "";
   jadwalSholat(citySelected);
});
