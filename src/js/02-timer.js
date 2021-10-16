import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('button[data-start]');
const daysLeft = document.querySelector('span[data-days]');
const hoursLeft = document.querySelector('span[data-hours]');
const minutesLeft = document.querySelector('span[data-minutes]');
const secondsLeft = document.querySelector('span[data-seconds]');

btnStart.disabled = true;

//Drugim argumentem funkcji flatpickr(selector, options) można przekazać nieobowiązkowy obiekt parametrów. Przygotowaliśmy dla Ciebie obiekt, który jest niezbędny do wykonania zadania. Zorientuj się, za co odpowiada każda właściwość w dokumentacji «Options» i użyj jej w swoim kodzie.
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    let selectedDate = selectedDates[0].getTime();
    let date = new Date();
    let today = date.getTime();

    if (selectedDate < today) {
      btnStart.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
      Notiflix.Notify.info('Press "Start", you can start Countdown :)');

      const countdown = e => {
        e.preventDefault();
        const currentCounter = setInterval(() => {
          let ms = selectedDate - new Date().getTime();
          btnStart.disabled = true;
          formattedTime(convertMs(ms));

          if (
            convertMs(ms).days === 0 &&
            convertMs(ms).hours === 0 &&
            convertMs(ms).minutes === 0 &&
            convertMs(ms).seconds === 0
          ) {
            Notiflix.Notify.success('the end');
            clearInterval(currentCounter);
          }
        }, 1000);
      };
      btnStart.addEventListener('click', countdown);
    }
  },
};

// Biblioteka czeka na jej inicjalizację w elemencie input[type="text"], dlatego dodaliśmy do HTML input#datetime-picker.
flatpickr('input[type="text"]', options);

//Po kliknięciu na przycisk «Start» skrypt powinien wyliczać raz na sekundę ile czasu pozostało do wskazanej daty i aktualizować interfejs licznika, pokazując cztery liczby: dni, godziny, minuty i sekundy w formacie xx:xx:xx:xx.
// Liczba dni może się składać z więcej niż dwóch cyfr.
// Licznik powinien się zatrzymać, po dojściu do daty końcowej, czyli 00:00:00:00.
// 💡 Nie będziemy komplikować. Jeśli licznik jest uruchomiony, należy odświeżyć stronę, aby go zrestartować i wybrać nową datę.
// Aby obliczyć wartości użyj gotowej funkcji convertMs, gdzie ms - różnica między końcową i aktualną datą w milisekundach.
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// FORMATOWANIE CZASU
// Funkcja convertMs() przywraca obiekt z obliczonym pozostałym czasem do daty końcowej.Zwróć uwagę, że nie formatuje wyniku.To znaczy, że jeśli pozostały 4 minuty czy sekundy, to funkcja przywróci 4, a nie 04.W interfejsie licznika konieczne jest dodanie 0 jeśli liczba zawiera mniej niż dwa symbole.Napisz funkcję addLeadingZero(value), która używa metody padStart() i przed renderowaniem interfejsu sformatuj wartość.
const addLeadingZero = value => {
  return value.toString().padStart(2, '0');
};

const formattedTime = ({ days, hours, minutes, seconds }) => {
  daysLeft.innerHTML = addLeadingZero(days);
  hoursLeft.innerHTML = addLeadingZero(hours);
  minutesLeft.innerHTML = addLeadingZero(minutes);
  secondsLeft.innerHTML = addLeadingZero(seconds);
};



// Notiflix Notify Module: Default Options

Notiflix.Notify.init({
  width: '280px',
  position: 'right-top', // 'right-top' - 'right-bottom' - 'left-top' - 'left-bottom' - 'center-top' - 'center-bottom' - 'center-center'
  distance: '10px',
  opacity: 1,
  borderRadius: '5px',
  rtl: false,
  timeout: 3000,
  messageMaxLength: 110,
  backOverlay: false,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  plainText: true,
  showOnlyTheLastOne: false,
  clickToClose: false,
  pauseOnHover: true,

  ID: 'NotiflixNotify',
  className: 'notiflix-notify',
  zindex: 4001,
  fontFamily: 'Quicksand',
  fontSize: '13px',
  cssAnimation: true,
  cssAnimationDuration: 400,
  cssAnimationStyle: 'fade', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
  closeButton: false,
  useIcon: true,
  useFontAwesome: false,
  fontAwesomeIconStyle: 'basic', // 'basic' - 'shadow'
  fontAwesomeIconSize: '34px',

  success: {
    background: '#32c682',
    textColor: '#fff',
    childClassName: 'notiflix-notify-success',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-check-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(50,198,130,0.2)',
  },

  failure: {
    background: '#ff5549',
    textColor: '#fff',
    childClassName: 'notiflix-notify-failure',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-times-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(255,85,73,0.2)',
  },

  warning: {
    background: '#eebf31',
    textColor: '#fff',
    childClassName: 'notiflix-notify-warning',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-exclamation-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(238,191,49,0.2)',
  },

  info: {
    background: '#26c0d3',
    textColor: '#fff',
    childClassName: 'notiflix-notify-info',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-info-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(38,192,211,0.2)',
  },
});
