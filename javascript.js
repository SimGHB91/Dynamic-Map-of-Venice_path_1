  // Inizializza la mappa centrata su Venezia
  var map = L.map('map').setView([45.438604, 12.328999], 14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
    minZoom: 14
  }).addTo(map);

  // Carica il file GeoJSON dal link RAW di GitHub
  fetch('https://raw.githubusercontent.com/SimGHB91/VENICE_CHAT_Heritage/refs/heads/main/SanPoloSantaCroce-2.geojson')
    .then(response => response.json())
    .then(data => {
      // Aggiungi il GeoJSON alla mappa con lo stile estratto dalle proprietà del GeoJSON
      var geojsonLayer = L.geoJSON(data, {
        style: function(feature) {
          return feature.properties && feature.properties.style;
        }
      }).addTo(map);

      // Zoom sulla geometria del GeoJSON
      map.fitBounds(geojsonLayer.getBounds());
    })
    .catch(error => console.error('Errore durante il caricamento del GeoJSON:', error));

  /////////////////////////////////// LIMITI VISIVI MAPPA ///////////////////////////////////////////
  var southWest = L.latLng(45.43619103160355, 12.320228467510223),
    northEast = L.latLng(45.442699, 12.336617);
  var bounds = L.latLngBounds(southWest, northEast);
  map.setMaxBounds(bounds);

  ///////////// definizione del marker colorato di rosso ////////////////////////////////////
  var selectedIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  //////////////////////////////////////// DEFINISCO L'ICONE DEI MARKER /////////////////////////////////////////////////
  var defaultIcon = new L.Icon.Default();
  // Variabile per tenere traccia dell'ultimo marker cliccato
  var lastClickedMarker = null;
  // Funzione per gestire il click su un marker
  function handleMarkerClick(marker, index) {
    if (lastClickedMarker && lastClickedMarker !== marker) { // Ripristina l'icona dell'ultimo marker cliccato, se diverso dal marker attuale
      lastClickedMarker.setIcon(defaultIcon); // Cambia l'icona del marker precedente a defaultIcon
    }
    marker.setIcon(selectedIcon); // Cambia l'icona del marker cliccato a selectedIcon
    lastClickedMarker = marker; // Aggiorna l'ultimo marker cliccato
    scrollToItem(index); // Scroll alla slide corrispondente
  }

  //////////////////////////////////////////////////////// POSIZIONE FISICA MARCATORI /////////////////////////////////////////////////////////////////////////////
  var markers = []; // Array per tenere traccia di tutti i marker
  markers.push(L.marker([45.438518, 12.32062], { icon: selectedIcon }).addTo(map));
  // markers[0].bindPopup("<b>LOCATION 1</b><br>GIARDINI PAPADOPOLI");
  markers[0].on('click', function () { handleMarkerClick(markers[0], 1); });

  markers.push(L.marker([45.437629, 12.322036], { icon: defaultIcon }).addTo(map));
  // markers[1].bindPopup("<b>LOCATION 2</b><br>CHIESA DI SAN NICOLA DA TOLENTINO");
  markers[1].on('click', function () { handleMarkerClick(markers[1], 2); });

  markers.push(L.marker([45.436767, 12.325469], { icon: defaultIcon }).addTo(map));
  // markers[2].bindPopup("<b>LOCATION 3</b><br>SCUOLA GRANDE DI SAN ROCCO");
  markers[2].on('click', function () { handleMarkerClick(markers[2], 3); });

  markers.push(L.marker([45.437287, 12.326891], { icon: defaultIcon }).addTo(map));
  // markers[3].bindPopup("<b>LOCATION 4</b><br>BASILICA DI SANTA MARIA GLORIOSA DEI FRARI");
  markers[3].on('click', function () { handleMarkerClick(markers[3], 4); });

  markers.push(L.marker([45.438375, 12.326022], { icon: defaultIcon }).addTo(map));
  // markers[4].bindPopup("<b>LOCATION 5</b><br>SCUOLA GRANDE SAN GIOVANNI EVANGELISTA");
  markers[4].on('click', function () { handleMarkerClick(markers[4], 5); });

  markers.push(L.marker([45.441777, 12.328538], { icon: defaultIcon }).addTo(map));
  // markers[5].bindPopup("<b>LOCATION 6</b><br>MUSEO DI STORIA NATURALE GIANCARLO LIGABUE");
  markers[5].on('click', function () { handleMarkerClick(markers[5], 6); });

  markers.push(L.marker([45.440761, 12.32982], { icon: defaultIcon }).addTo(map));
  // markers[6].bindPopup("<b>LOCATION 7</b><br>MUSEO DI PALAZZO MOCENIGO");
  markers[6].on('click', function () { handleMarkerClick(markers[6], 7); });

  markers.push(L.marker([45.441047, 12.331424], { icon: defaultIcon }).addTo(map));
  // markers[7].bindPopup("<b>LOCATION 8</b><br>GALLERIA INTERNAZIONALE D'ARTE MODERNA CA' PESARO");
  markers[7].on('click', function () { handleMarkerClick(markers[7], 8); });

  markers.push(L.marker([45.439677, 12.33461], { icon: defaultIcon }).addTo(map));
  // markers[8].bindPopup("<b>LOCATION 9</b><br>MERCATO DI RIALTO");
  markers[8].on('click', function () { handleMarkerClick(markers[8], 9); });

  markers.push(L.marker([45.438616, 12.335479], { icon: defaultIcon }).addTo(map));
  // markers[8].bindPopup("<b>LOCATION 10</b><br>CHIESA DI SAN GIACOMO APOSTOLO");
  markers[9].on('click', function () { handleMarkerClick(markers[9], 10); });

  markers.push(L.marker([45.438168, 12.335962], { icon: defaultIcon }).addTo(map));
  // markers[8].bindPopup("<b>LOCATION 11</b><br>PONTE DI RIALTO");
  markers[10].on('click', function () { handleMarkerClick(markers[10], 11); });

  window.addEventListener('load', function () { // Alla fine della pagina, dopo aver definito tutti i marker
    lastClickedMarker = markers[0]; // Imposta lastClickedMarker a marker1 inizialmente
  });

  //////////////////////////////// FUNZIONE SCROLL DA MARKER CLICCATO A CAROSELLI /////////////////////////////////////////////////////////////
  function scrollToCaroselli() {
    const caroselliElement = document.getElementById('caroselli');
    if (caroselliElement) {
        const yOffset = -30; 
        const y = caroselliElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
  function handleMarkerClick(marker, index) {
    if (lastClickedMarker && lastClickedMarker !== marker) {
        lastClickedMarker.setIcon(defaultIcon);
    }
    marker.setIcon(selectedIcon);
    lastClickedMarker = marker;
    scrollToItem(index); // Scroll alla slide corrispondente
    scrollToCaroselli(); // Scroll al carosello
  }

  ////////////////////////////////// CLICCO IL MARKER ED AVVIENE CLICK AUTOMATICO SU RELATIVA SLIDE ///////////////////////////////////////////
  function scrollToItem(slideNumber) {
    // Cerca l'elemento con ID "slide-" seguito dal numero della slide
    var slide = document.getElementById('slide-' + slideNumber);
    if (slide) {
      slide.click(); // Simula il click sull'elemento
    } else {
      console.error('Elemento con id "slide-' + slideNumber + '" non trovato.');
    }
  }

  ///////////////////////////////// GESTIONE DELL'ANIMAZIONE DI SCORRIMENTO ///////////////////////////////////////////////////
  function clickMarker(markerIndex) {
    var newMarkerIndex = (markerIndex + markers.length) % markers.length;
    var marker = markers[newMarkerIndex];
    if (lastClickedMarker && lastClickedMarker !== marker) {
      lastClickedMarker.setIcon(defaultIcon);
    }
    if (marker) {
      marker.setIcon(selectedIcon);
      marker.fire('click');
      lastClickedMarker = marker;
    } else {
      console.error('Marker non trovato.');
    }
  }

  function addSlideClickEvent(slideNumber, markerIndex) {
    var slide = document.getElementById('slide-' + slideNumber);
    if (slide) {
      slide.addEventListener('click', function () {
        clickMarker(markerIndex);
      });
    } else {
      console.error('Elemento con id "slide-' + slideNumber + '" non trovato.');
    }
  }
  for (let i = 1; i <= markers.length; i++) {
    addSlideClickEvent(i, i - 1);
  }
  for (let i = 0; i < markers.length; i++) {
    addSlideClickEvent(i + 1, i);
  }

  /////// FUNZIONE INVERSA: CLICK SU SLIDE CAROSELLO E CLICK AUTMATICO SU MARKER MAPPA //////////////////////////////////////
  function clickMarker(markerIndex) {
    var newMarkerIndex = (markerIndex + markers.length) % markers.length;
    var marker = markers[newMarkerIndex];

    // Se il marker è già selezionato, non fare nulla
    if (lastClickedMarker === marker) return;

    // Ripristina l'icona dell'ultimo marker se è diverso dal corrente
    if (lastClickedMarker && lastClickedMarker !== marker) {
      lastClickedMarker.setIcon(defaultIcon);  // Ripristina l'icona del marker precedente
    }

    // Aggiorna l'icona solo se il marker è diverso dall'ultimo selezionato
    marker.setIcon(selectedIcon);
    lastClickedMarker = marker;
  }

  // Associa ogni slide al rispettivo marker
  for (let i = 0; i < markers.length; i++) {
    addSlideClickEvent(i + 1, i);  // Associa le slide ai marker
  }

  // Configura lo slider per immagini
  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: '.slider-nav',
    speed: 300  // Imposta una velocità di transizione più veloce
  });

  // Configura lo slider per miniature
  $('.slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    centerMode: true,
    focusOnSelect: true,
    variableWidth: true,
    speed: 300,  // Riduci la velocità di scorrimento
    responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  }).on('afterChange', function(event, slick, currentSlide) {
    // Chiama la funzione ottimizzata clickMarker
    clickMarker(currentSlide);
  });