# Lijst van API calls op Albert
## Zoek naar "wortel"
```
http://www.ah.nl/service/rest/zoeken?rq=wortel
```

## Fetch huidige boodschappenlijst
```
http://www.ah.nl/service/rest/mijnlijst
```

## Verminder hoeveelheid in boodschappenlijst
```
http://www.ah.nl/service/rest/shoppinglists/0/items/0
PUT
{quantity: 2, id: "0"}
```

## Increase hoeveelheid in boodschappenlijst
```
http://www.ah.nl/service/rest/shoppinglists/0/items/0
PUT
{
  "quantity": 3,
  "id": "0",
  "originCode": "CMS",
  "type": "PRODUCT",
  "label": "GROCERY",
  "inOrder": false,
  "item": {
    "id": "wi99131",
    "description": "AH Bi\u00ado\u00adlo\u00adgisch Vol\u00adko\u00adren be\u00adschuit",
    "unitSize": "13 stuks",
    "brandName": "AH Biologisch",
    "categoryName": "Ontbijtgranen, broodbeleg, tussendoor\/Beschuit",
    "availability": {
      "orderable": true,
      "label": "Leverbaar"
    },
    "priceLabel": {
      "now": 0.99
    },
    "discount": {
      "type": {
        "name": "BONUS"
      },
      "label": "2e HALVE PRIJS",
      "period": "vanaf maandag"
    },
    "propertyIcons": ["bio"],
    "images": [ ... ]
  }
}
```

## Voeg nieuw product toe aan lijst
```
http://www.ah.nl/service/rest/shoppinglists/0/items
PUT
{
  "type": "PRODUCT",
  "item": {
    "id": "wi4076"
  },
  "quantity": 1,
  "originCode": "PSE"
}
```
