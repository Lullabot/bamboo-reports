#!/usr/local/bin/node
"use strict";

const data = {
    addresses: {
        chris: {
            "latitude": 39.76200025816979,
            "longitude": -105.22597915921624,
            "formattedAddress": "510, Jackson Street, Golden, Jefferson County, Colorado, 80403, United States",
            "country": "United States",
            "city": "Golden",
            "state": "Colorado",
            "zipcode": "80403",
            "streetName": "Jackson Street",
            "streetNumber": "510",
            "countryCode": "US",
            "neighbourhood": "",
            "provider": "openstreetmap"
        },
        seth: {
            "latitude": 39.4083715,
            "longitude": -107.21694324089566,
            "formattedAddress": "624, Surrey Road, Carbondale, Garfield County, Colorado, United States",
            "country": "United States",
            "city": "Carbondale",
            "state": "Colorado",
            "streetName": "Surrey Road",
            "streetNumber": "624",
            "countryCode": "US",
            "neighbourhood": "",
            "provider": "openstreetmap"
        }
    },
    directoryRecords:
        [
            {
                "id": "40469",
                "displayName": "Mateu Aguiló Bosch",
                "firstName": "Mateu",
                "lastName": "Aguiló Bosch",
                "preferredName": "Mateu",
                "jobTitle": "Lead Engineer",
                "workPhone": null,
                "mobilePhone": "3-460-537-5480",
                "workEmail": "mateu@lullabot.com",
                "department": "Development Services",
                "location": "Spain",
                "skypeUsername": "mateu.aguilo.bosch",
                "pronouns": null,
                "workPhoneExtension": null,
                "supervisor": "Andrew Berry",
                "photoUploaded": true,
                "photoUrl": "https://images7.bamboohr.com/12479/photos/40469-1-4.jpg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9pbWFnZXM3LmJhbWJvb2hyLmNvbS8xMjQ3OS8qIiwiQ29uZGl0aW9uIjp7IkRhdGVHcmVhdGVyVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjM3Nzg2MDk5fSwiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2NDAzNzgxMDl9fX1dfQ__&Signature=Dx~apraDnYIr3AAhFp2NhjYuEm4qrYvhONrQ1JgmLi-DbIs-jivQAVmXp~kDCqN0mEh2OkTpcIeVHpVPB1EOPKl8om28-WmhBYUq2vCxxyFFhJ3Qy~bf22BBPmLgAntEjyXAtYVP9DazOQKcZfKLz1MAdZkxx9wjmWDiTTAos5bMMksQ2ZrfH~2SVlwdq1DHy5snvBsSgxSgZrpCaSls1iC5JFkk4a9u0ZG5lh2i1yJKaVl2igBE9Wjqc~OvSo70R7~gmqZ76~tCrVZdXeG-iCA86IGoRRcnlHlfheHxIIji5xds1JZG67iMsbv7HQK75FpLxRo~Wd9QZd1kYHFhsA__&Key-Pair-Id=APKAIZ7QQNDH4DJY7K4Q",
                "canUploadPhoto": 0
            },
            {
                "id": "40541",
                "displayName": "Kayla AhoWalsh",
                "firstName": "Kayla",
                "lastName": "AhoWalsh",
                "preferredName": "Kayla",
                "jobTitle": "Staff Accountant",
                "workPhone": null,
                "mobilePhone": null,
                "workEmail": "kayla.ahowalsh@lullabot.com",
                "department": "Administration",
                "location": "United States",
                "skypeUsername": null,
                "pronouns": null,
                "workPhoneExtension": null,
                "supervisor": "Kris Konrady",
                "photoUploaded": true,
                "photoUrl": "https://images7.bamboohr.com/12479/photos/40541-0-4.jpg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9pbWFnZXM3LmJhbWJvb2hyLmNvbS8xMjQ3OS8qIiwiQ29uZGl0aW9uIjp7IkRhdGVHcmVhdGVyVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjM3Nzg2MDk5fSwiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2NDAzNzgxMDl9fX1dfQ__&Signature=Dx~apraDnYIr3AAhFp2NhjYuEm4qrYvhONrQ1JgmLi-DbIs-jivQAVmXp~kDCqN0mEh2OkTpcIeVHpVPB1EOPKl8om28-WmhBYUq2vCxxyFFhJ3Qy~bf22BBPmLgAntEjyXAtYVP9DazOQKcZfKLz1MAdZkxx9wjmWDiTTAos5bMMksQ2ZrfH~2SVlwdq1DHy5snvBsSgxSgZrpCaSls1iC5JFkk4a9u0ZG5lh2i1yJKaVl2igBE9Wjqc~OvSo70R7~gmqZ76~tCrVZdXeG-iCA86IGoRRcnlHlfheHxIIji5xds1JZG67iMsbv7HQK75FpLxRo~Wd9QZd1kYHFhsA__&Key-Pair-Id=APKAIZ7QQNDH4DJY7K4Q",
                "canUploadPhoto": 0
            },
            {
                "id": "40494",
                "displayName": "Chris Albrecht",
                "firstName": "Christopher",
                "lastName": "Albrecht",
                "preferredName": "Chris",
                "jobTitle": "Senior Technical Project Manager",
                "workPhone": null,
                "mobilePhone": "303-997-6693",
                "workEmail": "chris.albrecht@lullabot.com",
                "department": "Development Services",
                "location": "United States",
                "skypeUsername": "chris.e.albrecht",
                "pronouns": null,
                "workPhoneExtension": null,
                "supervisor": "Darren Petersen",
                "photoUploaded": true,
                "photoUrl": "https://images7.bamboohr.com/12479/photos/40494-2-4.jpg?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9pbWFnZXM3LmJhbWJvb2hyLmNvbS8xMjQ3OS8qIiwiQ29uZGl0aW9uIjp7IkRhdGVHcmVhdGVyVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjM3Nzg2MDk5fSwiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2NDAzNzgxMDl9fX1dfQ__&Signature=Dx~apraDnYIr3AAhFp2NhjYuEm4qrYvhONrQ1JgmLi-DbIs-jivQAVmXp~kDCqN0mEh2OkTpcIeVHpVPB1EOPKl8om28-WmhBYUq2vCxxyFFhJ3Qy~bf22BBPmLgAntEjyXAtYVP9DazOQKcZfKLz1MAdZkxx9wjmWDiTTAos5bMMksQ2ZrfH~2SVlwdq1DHy5snvBsSgxSgZrpCaSls1iC5JFkk4a9u0ZG5lh2i1yJKaVl2igBE9Wjqc~OvSo70R7~gmqZ76~tCrVZdXeG-iCA86IGoRRcnlHlfheHxIIji5xds1JZG67iMsbv7HQK75FpLxRo~Wd9QZd1kYHFhsA__&Key-Pair-Id=APKAIZ7QQNDH4DJY7K4Q",
                "canUploadPhoto": 1
            },
        ]
};

module.exports = data;