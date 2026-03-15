# Note Progettuali

Di seguito sono riportate le assunzioni dedotte dal [documento di progetto](./TRACCIA.md) e le scelte progettuali effettuate.

## Applicazione

L'app è un pannello per la gestione di un sistema domotico di fascia alta.

Il sistema è **multi-zona**: ogni zona (es. "Vip Port", "Room 202") ha un proprio set di dispositivi A/V, luci e climatizzatori.

### Usabilità (UX) ed Interfaccia (UI)

L'app è pensata prevalentemente per device piccoli (mobile) e l'interfaccia è composta dagli elementi tipici di applicazioni mobile:

- **Barra di navigazione inferiore** per la navigazione
- **Header** per gestire la zona attiva e i dispositivi ad essa associati
- **Main** con il contenuto della pagina

La **navigazione** è dinamica, le pagine mostrate dipendono dalla disponibilità di dispositivi associati alla zona selezionata. La struttura delle pagine prevede:

- **Home**: landing page con logo whitelabel e informazioni di contorno
- **A/V** (\*): permette la selezione e la gestione dei dispositivi A/V (on/off, telecomando, ...)
- **Luci** (\*): permette l'accensione/spegnimento delle luci
- **HVAC** (\*): permette la gestione dei dispositivi caldo/freddo (on/off, temperatura, ...)
- **Impostazioni**: area protetta (da password) con impostazioni da admin (zone, SAT, ...)

(\*) Dipende dai dispositivi associati alla zona.

L'**header** è presente solo nelle pagine di gestione dei dispositivi e si compone di:

- **Hamburger Menu** che permette di cambiare la zona selezionata (quando presente più di una zona)
- **Nome della zona**
- **Pulsante ON/OFF** per accendere/spegnere i dispositivi A/V

## Vincoli Progettuali

- **Vue**: `>= 2.6.12` (Vue 2, con Vue CLI)
- **Node**: `20.10.0`

## Scelte Progettuali

Scelte progettuali effettuate:

- [Stack](#stack)
- [Mobile-First](#mobile-first)
- [Sessione e accessi](#sessione-e-accessi)
- [Routing (Vue Router)](#routing-vue-router)
- [Data-Driven Application](#data-driven-application)
- [Esempio: Unità](#esempio-unità)
- [Esempio: Zona](#esempio-zona)
- [Esempio: Dispositivo](#esempio-dispositivo)
- [Gestione dello Stato (Vuex)](#gestione-dello-stato-vuex)

### Stack

- **Node** `20.10.0`
- **Vue** `2.6.12` (@vue/cli)
- **VueX** per la gestione dello stato
- **Tailwind CSS**
- [**Portal-Vue**](https://portal-vue.linusb.org/) per la gestione delle modali
- Google Material Icons CDN

### Mobile-First

L'utilizzo principale è mobile, quindi ho replicato l'app mobile e l'ho adattata a schermi larghi con le seguenti modifiche:

- Barra di navigazione inferiore > **Side-bar laterale sinistra**
- Dropdown sorgenti e zone > **Modali**

Ho scelto di non complicare troppo il layout, sia per agevolare l'usabilità sia per semplicità realizzativa.

### Sessione e accessi

Per visualizzare o nascondere la pagina impostazioni si è scelto di simulare una sessione in maniera molto semplificata. L'idea è quella di simulare un accesso non autenticato, `guest`, ad esempio tramite QR Code, oppure un accesso autenticato, `admin`, che garantisce l'accesso alla pagina delle impostazioni.

Inoltre sono state aggiunte le informazioni che definiscono l'ambito di validità della sessione.

```json
{
  "role": "guest",
  "unit_id": "unit_id",
  "zone_ids": ["zone-001", "zone-002"]
}
```

### Routing (Vue Router)

Le rotte rispecchiano le pagine. Per le sezioni operative la navigazione è contestualizzata tramite l'id della zona:

- `/units/:unitId` Home
- `/units/:unitId/zones/:zoneId/av` A/V
- `/units/:unitId/zones/:zoneId/lights` Luci
- `/units/:unitId/zones/:zoneId/hvac` Clima
- `/units/:unitId/settings` Impostazioni

Ho omesso, per semplicità, il prefisso `/units/:unitId`.

### Data-Driven Application

Ho scelto di simulare l'interazione client-server mediante JSON locali di mock.

Per gestire unità complesse e variabili (quali hotel, yacht, case) ho pensato di definire tre tipologie di modello:

- L'**unità** che rappresenta il sistema domotico (suite, yacht, casa) e si compone di una o più zone
- La **zona** che rappresenta la partizione domotica indipendente e si compone di uno o più dispositivi
- I **dispositivi** che rappresentano i terminali dell'impianto domotico. Per semplicità ho definito un unico modello caratterizzato da una tipologia: `av`, `light` o `hvac`

### Esempio: Unità

```ts
interface Unit {
  id: string;
  brand: string; // "AZIMUT Grande"
  settings: {
    sat: {
      options: string[]; // ["SKY IT", "SKY UK", "SKY NZ", "HUMAX", "NO SAT"]
      selected: string; // "NO SAT"
      default: string;
    };
  };
  zones: Zone[];
}
```

### Esempio: Zona

```ts
interface Zone {
  id: string;
  name: string; // "Master Cabin"
  visible: boolean;
  devices: Device[];
}
```

### Esempio: Dispositivo

```ts
interface Device {
    id: string,
    type: Enum('av', 'light', 'hvac'),
    name: string,
    power: boolean,
    data: Data,
}
```

I `data` dipendono dal tipo di device. Per A/V:

```ts
interface Data {
    type: Enum('apple_tv', 'dtv', 'satellite', 'blu_os'),
}
```

Per le luci:

```ts
interface Data {
  level: Number;
}
```

Per il clima:

```ts
interface Data {
  temp: Number;
  setpoint: Number;
  mode: string; // "cool"
  fan_speed: string; // "auto"
  fan_speed_value: Number;
}
```

### Gestione dello Stato (Vuex)

Ho usato `vuex` per gestire lo stato dell'applicazione. Ho creato i seguenti moduli:

- `stato`: per la gestione dello stato dell'app

```ts
interface AppState {
    user_role: Enum('guest', 'admin'),
    // ^ ^ ^ Che permette di accedere alle impostazioni
    unit_id: string,
    zone_ids: string[],
    active_zone_id: string,
    // ^ ^ ^ Zona selezionata
    enabled_modules: Array<'av' | 'lights' | 'hvac'>,
    // ^ ^ ^ Moduli visualizzabili: dipendono dai dispositivi associati alla zona
    active_av: string,
    loading_av: boolean,
    // ^ ^ ^ Dispositivo AV attivo (workaround per semplificare)
}
```

- `settings`: impostazioni generali e sat.
- `zones`: lista delle zone associate alla sessione e lista dei devices associati alla zona (`zone_devices`).
