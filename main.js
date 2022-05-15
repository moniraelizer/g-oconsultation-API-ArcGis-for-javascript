
require([
    "esri/config",
    "esri/Map", 
    "esri/views/MapView", 
    "esri/widgets/BasemapToggle", 
    "esri/widgets/BasemapGallery",
    "esri/layers/FeatureLayer",
    "esri/widgets/ScaleBar",
    "esri/widgets/Legend"
], function (esriConfig,Map, MapView,BasemapToggle,BasemapGallery, FeatureLayer, ScaleBar, Legend) {

    esriConfig.apiKey = "AAPK05e6f81faa4f46d795e3418eb6d9806cqT972Cup3Kz8O-Loq4YHkkw93ZlE-XbV1iVjmnf_Jwb02_RCaQaklX58o0h6nH7Y";
    
    const map = new Map({
        basemap: "arcgis-topographic"
        });
            
    const view = new MapView({
            container: "viewDiv",
            map: map,
            center: [4.38869, 45.43711],  // 
            zoom: 13
        });

        //affichage de la couche
  ////// on commence d'abord par le style à styliser les types d'occupation du sol

  function createFillSymbol(value, color) {
    return {
      "value": value,
      "symbol": {
        "color": color,
        "type": "simple-fill",
        "style": "solid",
        "outline": {
          "style": "none"
        }
      },
      "label": value
    };
  }

  const openSpacesRenderer = {
    type: "unique-value",
    field: "TYPOCCSOL",
    uniqueValueInfos: [
      createFillSymbol("Tissu urbain continu (Sols imperméables > 80 %)", "#a50026"),
      createFillSymbol("Tissu urbain discontinu dense (Sols imperméables : 50%- 80 %)", "#d73027"),
      createFillSymbol("Industrie, commerce, administration, armée et entreprises", "#ffffbf"),
      createFillSymbol("Espaces verts urbains", "#a6d96a"),
      createFillSymbol("Agriculture + aires semi-naturelles + Zones humides", "#ffffbf"),
      createFillSymbol("Sport et loisirs", "#3288bd"),
      createFillSymbol("Forêts", "#006837"),
      createFillSymbol("Tissu urbain discontinu moyennement dense (Sols imperméables : 30%- 50 %)", "#d73027"),
      createFillSymbol("Structures isolées", "#8073ac"),
      createFillSymbol("Terrain sans affectation actuelle", "#7f3b08"),
      createFillSymbol("Autre", "#1a1a1a")
      
    ]
  };

  const popupopenspaces = {
    "title": "Occupation du sol",
    "content": "<b>Code:</b> {CODE}<br><b>Ville:</b> {CITIES}<br><b>Luz crt:</b> {LUZ_OR_CIT}<br><b>type:</b> {TYPOCCSOL}<br>"
  }

  const openspaces  = new FeatureLayer({
    url: "https://services2.arcgis.com/8uevmRlLsZdoxHk8/arcgis/rest/services/URBAN_ATLAS_2012/FeatureServer/0",
    renderer: openSpacesRenderer,
    opacity: 1,
    outFields: ["CODE","CITIES","LUZ_OR_CIT","TYPOCCSOL"],
    popupTemplate: popupopenspaces
  }); 

    const basemapToggle = new BasemapToggle({
            view: view,
            nextBasemap: "arcgis-imagery"
         });

         view.ui.add(basemapToggle,"bottom-right");

    const basemapGallery = new BasemapGallery({
           view: view,
           source: {
             query: {
               title: '"World Basemaps for Developers" AND owner:esri'
             }
           }
         });
   



view.ui.add(basemapGallery, "top-right");
map.add(openspaces, 0 );

  // afficher une légende 
  const scalebar = new ScaleBar({
    view: view
  });

  view.ui.add(scalebar, "bottom-left");

  // la légende
  const legend = new Legend ({
    view: view
  });
  view.ui.add(legend, "top-left");
});


