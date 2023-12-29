const LitElement = Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

const CARD_VERSION = '0.1.5';

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

/* Vent Violent */
/* Pluie Innondation */
/* Orages */
/* Crue */
/* Neige Verglas */
/* Canicule */
/* Grand Froid */
/* Avalanche */
/* Vague Submersion */
/* Cyclone */
/* Forte Houle */
/* Fortes Pluies-orages */
/* Verglas */
/* Mer dangereuse à la côte*/
/* BMS */
/* Alerte Cyclonique */

//-----------------------------------------------
/*

.block_legend .inner .legend > li i {
  margin-right: 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%; }

  .block_legend .inner .legend > li p {
	text-align: left;
	color: #333333;
	font-size: 11px;
}


<div class="inner">
<ul class="legend">
<li>
  <i aria-label="Vigilance orange" style="background-color: rgb(255, 184, 43);"></i> 
  <p><strong>Soyez très vigilant </strong> 
    <span><b>Soyez très vigilant</b> : des phénomènes dangereux sont prévus. Tenez-vous au courant de l'évolution de la situation et suivez les conseils de sécurité émis par les pouvoirs publics.</span>
  </p>
</li> 
<li>
  <i aria-label="Vigilance jaune" style="background-color: rgb(255, 246, 0);"></i> 
  <p><strong>Soyez attentif</strong> 
    <span><b>Soyez attentif</b> si vous pratiquez des activités sensibles aux risques météorologiques ou à proximité d'un rivage ou d'un cours d'eau. Des phénomènes habituels dans la région mais occasionnellement et localement dangereux (exemple : mistral, orage d'été, montée des eaux, fortes vagues submergeant le littoral) sont en effet prévus. Tenez-vous au courant de l'évolution de la situation.</span>
  </p>
</li> 
<li>
  <i aria-label="Pas de vigilance" style="background-color: rgb(49, 170, 53);"></i> 
  <p>
    <strong class="no-hide-mobile">Pas de vigilance particulière</strong>
    </p>
</li>
<li>
   <i aria-label="Vigilance rouge" style="background-color: rgb(204, 0, 0);"></i>
   <p><strong>Vigilance absolue</strong> 
     <span><b>Une vigilance absolue s'impose</b> : des phénomènes dangereux d'intensité exceptionnelle sont prévus. Tenez-vous régulièrement au courant de la situation et respectez impérativement les consignes de sécurité émises par les pouvoirs publics.</span>
   </p>
</li>
</ul>
</div>

*/




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
        niveauAlerte:  this._getLevelFromColor(hass.states[`sensor.${sensor_name}`].attributes['Vent violent']),
        icon: 'mdi:weather-windy'
      })
      res.push({
        nomAlerte: 'Inondation',
        niveauAlerte:  this._getLevelFromColor(hass.states[`sensor.${sensor_name}`].attributes['Inondation']),
        icon: 'mdi:waves-arrow-up'
      })
      res.push({
        nomAlerte: 'Orages',
        niveauAlerte:  this._getLevelFromColor(hass.states[`sensor.${sensor_name}`].attributes['Orages']),
        icon: 'mdi:weather-lightning'
      })
      res.push({
        nomAlerte: 'Pluie-inondation',
        niveauAlerte:  this._getLevelFromColor(hass.states[`sensor.${sensor_name}`].attributes['Pluie-inondation']),
        icon: 'mdi:weather-pouring'
      })
      res.push({
        nomAlerte: 'Neige-verglas',
        niveauAlerte:  this._getLevelFromColor(hass.states[`sensor.${sensor_name}`].attributes['Neige-verglas']),
        icon: 'mdi:snowflake'
      })
      res.push({
        nomAlerte: 'Grand-froid',
        niveauAlerte:  this._getLevelFromColor(hass.states[`sensor.${sensor_name}`].attributes['Grand-froid']),
        icon: 'mdi:snowman'
      })
      res.push({
        nomAlerte: 'Vagues-submersion',
        niveauAlerte:  this._getLevelFromColor(hass.states[`sensor.${sensor_name}`].attributes['Vagues-submersion']),
        icon: 'mdi:waves'
      })
      //res.push({
      //  nomAlerte: 'Canicule',
      //  niveauAlerte:  this._getLevelFromColor(hass.states[`sensor.${sensor_name}`].attributes['Canicule']),
      //  icon: 'mdi:weather-sunny'
      //})

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

  _getLevelFromColor( pColor ) {

    if (pColor == 'Vert') {
      return 'level1';
    } else if (pColor == 'Jaune') {
      return 'level2';
    } else if (pColor == 'Orange') {
      return 'level3';
    } else if (pColor == 'Rouge') {
      return 'level4';
    } else {
      return 'level0';
    }

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
      <div class="in-alerte"><ha-icon icon="${alerte.icon}" class="${alerte.niveauAlerte} levelicon"></ha-icon>
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
