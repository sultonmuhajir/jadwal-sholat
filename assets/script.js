const tgl = new Date().toISOString().slice(0, 10).split("-");
const kotaDefault = "bangkalan";


function jadwalSholat(kota) {
   const tittle = kota.charAt(0).toUpperCase() + kota.slice(1);
   $("h1").html(tittle);
   $.getJSON(`https://raw.githubusercontent.com/lakuapik/jadwalsholatorg/master/adzan/${kota}/${tgl[0]}/${tgl[1]}.json`,
      function (data) {
         $.each(data, function (i, data) {
            $("tbody").append(`<tr>
            <td> ${data.tanggal.split("-").reverse().join("/")} </td>
            <td> ${data.imsyak} </td>
            <td> ${data.shubuh} </td>
            <td> ${data.terbit} </td>
            <td> ${data.dhuha} </td>
            <td> ${data.dzuhur} </td>
            <td> ${data.ashr} </td>
            <td> ${data.magrib} </td>
            <td> ${data.isya} </td>
            </tr>`);
         })
      })
}
jadwalSholat(kotaDefault);


$.getJSON("https://raw.githubusercontent.com/lakuapik/jadwalsholatorg/master/kota.json",
   function (city) {
      $.each(city, function (i, city) {
         const cityTittle = city.charAt(0).toUpperCase() + city.slice(1);
         if (city == "bangkalan") {
            $("select").append(`<option value=${city} selected> ${cityTittle} </option>`);
         } else {
            $("select").append(`<option value=${city}> ${cityTittle} </option>`);
         }
      })
   })


$("select").on("change", function () {
   let citySelected = $("select").val();
   $("tbody").html("");
   jadwalSholat(citySelected);
});