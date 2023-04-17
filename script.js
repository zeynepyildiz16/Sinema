const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');


getFromLocalStorage();
calculateTotal();



container.addEventListener('click', function (e) {


    // container a ADDEVENTLİSTENER aracılığı ile CLİCK eventi ekliyorum.Bu click eventi içinde function yazdık e parametresi atadık burda e parametresi bizim için hangi elemana tıkladık bize onu gösterir.



    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {


        //Console.log (e.TAGRET) yazdık ve bu eventi (click i) alan eleman bize gelmiş oldu.Ancak sadece bunu yazarsak bana containerda nereye tıklarsam orayı verir seat clasına sahip olması önemli olmaz.Bunun için  bir container ın altına bir filtreleme yapmamız gerekiyordu.İF ile seat clası filtrelemesini sağladık.


        //CLASSLİST(Klas Listesi İçinde).CONTAİNS(İçeren,içermek)('seat'(klasına sahip olanlar dediğimizde true değerini gönderiyorsa )artık sadece seat klasına sahip olanlara ulaşmış oluruz.



        //Ancak dolu koltuklar da tıkladığıımızda geliyor çünkü onlarda seat klasına sahip dolayısıyla ekstra bir filtreleme uyguladık ve AND (&&) operatörü aracılığı ile gelen elemanın target ı içerisindeki classList lere bakıp contains metodu aracılığı ile reserved yani dolu kltukları vermiş olduğumuz klas içermeyecek demek için ! koydum e.target la başlayan ifademin başına.



        e.target.classList.toggle('selected');
        calculateTotal()


        //Artık class listesi üzerine varsa silsin yoksa eklesin demek için TOGGLE metodunu kullandım ve dedim ki eleman içinde selected klası varsa sil yoksa ekle.





    }
});

select.addEventListener('change', function (e) {
    calculateTotal();

});

// İkinci filme geçtiğmiz anda ekranın yenilenmesini sağlamak için CHANGE yazdık.



function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatsArr = [];
    const seatsArr = [];
    selectedSeats.forEach(function (seat) {
        selectedSeatsArr.push(seat);
    }
    );
    // yeni bir liste oluşturup geri göndermek istediğimden map metodunu kullanıyorum.İki adet dizioluşturuyorum forEach metoduyla her bir elemanı teker teker dolaşıyrum ve function içindeki her bir eleman seat(boş) olarak karşımıza gelir.Gelen seat bilgisini push metodu aracılığıyla selectedSeatsArr dizisinin içine attım.

    seats.forEach(function (seat) {
        seatsArr.push(seat);

    });

    let selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
        return seatsArr.indexOf(seat);
    })

    let selectedSeatCount = selectedSeats.length;
    // Bilet toplam fiyatı hesaplayıp ekrana yazdırabilmek için seçili kaç koltuk var (Selected klası) önce onu bulmalıyız.Bir değişken tanımladım container üzerinden de seçme işlemi yaptım.querySelectorAll dememin sebebi birden fazla eleman seçecek olmam.
    //LENGHT özelliği ile seçilen ve boş olan koltukların sayısını buldum.İlerleyen aşamalarda bunu SPREAD ile çok kolay yapacağız.



    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    //getElementById aldığımız sount bilgisini innertext ile direkt burrda yazdırıyoruz.
    saveToLocalStorage(selectedSeatIndexs);
}
function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }


    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
}

function saveToLocalStorage(indexs) {// Burda gönderdiğimiz index numaralarını kaydediyoruz.
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}





















