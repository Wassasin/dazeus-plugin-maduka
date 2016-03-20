# Lijst van API calls op Albert
Als hieronder er geen HTTP-request-type bij staat (GET, POST, PUT), ga dan uit van GET.

## Login
```
https://www.ah.nl/mijn/inloggen/basis
POST
userName:<EMAIL>
password:<PASSWORD>
rememberUser:true
```
Vervolgens komt er een javascript-redirect. (met misschien wat cookie-manipulatie in javascript)

```
https://www.ah.nl/mijn/ingelogdSso
```
Vervolgens komt er nog een javascript-redirect.

```
https://www.ah.nl/mijn/ingelogdSso
GET
c1:ahold_sso_status,-1,<KNIP>
c2:ahold_presumed_member_no,365,<KNIP>
nocache:1458471540549
```
En zijn we ingelogd!

```
https://www.ah.nl/mijn/ingelogd
```

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
