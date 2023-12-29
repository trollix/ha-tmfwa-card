const LitElement = Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

const CARD_VERSION = '0.0.2';

console.info(
  `%c  TMFWA-CARD  %c  Version ${CARD_VERSION}  `,
  'color: white; font-weight: bold; background: crimson',
  'color: #000; font-weight: bold; background: #ddd',
);

//-----------------------------------------------
// Attributs de sensor.33_weather_alert
//-----------------------------------------------
// Vent violent: Vert
// Inondation: Vert
// Orages: Vert
// Pluie-inondation: Vert
// Neige-verglas: Vert
// Grand-froid: Vert
// Vagues-submersion: Vert
// attribution: Data provided by Météo-France
// icon: mdi:weather-cloudy-alert
// friendly_name: 33 Weather alert
//-----------------------------------------------


function hasConfigOrEntityChanged(element, changedProps) {
  if (changedProps.has("config")) {
    return true;
  }
  
  const oldHass = changedProps.get("hass");
  if (oldHass) {
    return (
      oldHass.states[element.config.entity] !==
        element.hass.states[element.config.entity]
    );
  }
  
  return true;
}
  
class TMFWACard extends LitElement {
  
  static get properties() {
    return {
      config: {},
      hass: {},
    };
  }
  
  _getAlertes(hass, sensor_name, above_level) {
    
    var res = [];

    if (typeof hass.states[`sensor.${sensor_name}`] != "undefined") {

      const sVentViolent        = hass.states[`sensor.${sensor_name}`].attributes['Vent violent'];
      const sInondation         = hass.states[`sensor.${sensor_name}`].attributes['Inondation'];
      const sOrages             = hass.states[`sensor.${sensor_name}`].attributes['Orages'];
      const sPluieInondation    = hass.states[`sensor.${sensor_name}`].attributes['Pluie-inondation'];
      const sNeigeVerglas       = hass.states[`sensor.${sensor_name}`].attributes['Neige-verglas'];
      const sGrandFroid         = hass.states[`sensor.${sensor_name}`].attributes['Grand-froid'];
      const sVaguesSubmersion   = hass.states[`sensor.${sensor_name}`].attributes['Vagues-submersion'];
      const sAttribution        = hass.states[`sensor.${sensor_name}`].attributes['attribution'];
      
      res.push({
        nomAlerte: 'Vent violent',
        niveauAlerte:  hass.states[`sensor.${sensor_name}`].attributes['Vent violent']
      })
      res.push({
        nomAlerte: 'Inondation',
        niveauAlerte:  hass.states[`sensor.${sensor_name}`].attributes['Inondation']
      })
      res.push({
        nomAlerte: 'Orages',
        niveauAlerte:  hass.states[`sensor.${sensor_name}`].attributes['Orages']
      })
      res.push({
        nomAlerte: 'Pluie-inondation',
        niveauAlerte:  hass.states[`sensor.${sensor_name}`].attributes['Pluie-inondation']
      })
      res.push({
        nomAlerte: 'Neige-verglas',
        niveauAlerte:  hass.states[`sensor.${sensor_name}`].attributes['Neige-verglas']
      })
      res.push({
        nomAlerte: 'Grand-froid',
        niveauAlerte:  hass.states[`sensor.${sensor_name}`].attributes['Grand-froid']
      })
      res.push({
        nomAlerte: 'Vagues-submersion',
        niveauAlerte:  hass.states[`sensor.${sensor_name}`].attributes['Vagues-submersion']
      })

    }
    return res;
  }
  
  setConfig(config) {
    const defaultConfig = {
      'no_alert_label': 'Aucune alerte',
      'sensor_name': '33_weather_alert',
      'above_level': 1,
      'title': 'Alertes Météo',
      'icon': 'mdi:square'
    }
  
    this.config = {
      ...defaultConfig,
      ...config
    };
  }
  
  render() {
    if (!this.config || !this.hass) {
      return html``;
    }
    
    //console.log('--- LOG tmfwa ---')
    const alertes = this._getAlertes(this.hass, this.config.sensor_name, this.config.above_level);

    return html`
      <ha-card header="${this.config.title}">
          <div id="tmfwacard">
          ${alertes.length > 0
            ? html`<div class="ok-alerte">${alertes.map(alerte => this.renderAlerte(alerte))}</div>`
            : html`<div class="no-alerte">${this.config.no_alert_label}</div>`
          }
          </div>
      </ha-card>
    `;
  }
  
  renderAlerte(alerte) {
    return html
    `
      <div class="in-alerte"><ha-icon icon="${this.config.icon}" class="${alerte.niveauAlerte} levelicon"></ha-icon>
      ${alerte.nomAlerte}</div>
    `;
  }
  
  getCardSize() {
    return this.config.entities.length + 1;
  }
  
  static get styles() {
    return css`
    #tmfwacard {
      margin-top: 0.4em;
      padding-bottom: 0.8em;
      display: flex;
    }
    .ok-alerte {
      margin-left: 2em;
      margin-right: 2em;
      margin: auto;
      display: float;
      width: auto;
    }
    .in-alerte {
       margin: 0px 0px 0px 15px;
       padding: 1px 0px 0px 0px;
       float: left;
       position: relative;
       width: 125px;
    }
    .level0 {
      color: grey;
    }
    .level1 {
      color: green;
    }
    .level2 {
      color: orange;
    }
    .level3 {
      color: red;
    }
    .level4 {
      color: red;
    }
    .levelicon {
      --mdc-icon-size: 2em;
    }
    .no-alertes {
      margin-left: 1.4em;
    }
    `;
  }
}
  
customElements.define('tmfwa-card', TMFWACard);
  
// Puts card into the UI card picker dialog
(window).customCards = (window).customCards || [];
(window).customCards.push({
  type: 'tmfwa-card',
  name: 'Meteo France Weather Alert Card',
  preview: true,
  description: 'This Lovelace custom card displays Meteo France Weather Alert information provided by French Weather Service.',
});
