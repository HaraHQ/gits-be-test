import axios from "axios";

export const getAuthToken = async () => {
  const url = process.env.SS_API_URL + '/accesstoken?grant_type=client_credentials';
  const { data, status } = await axios.post(url, {
    "client_id": process.env.SS_CLIENT,
    "client_secret": process.env.SS_SECRET
  }, {
    maxBodyLength: Infinity,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  if (status === 200) {
    console.log('token:', data.access_token);
    return data.access_token;
  }

  return false;
}

export const getPatient = async (nik: string | number) => {
  const token = await getAuthToken();
  console.log('search patient by nik using this token:', token);
  const url = process.env.SS_STAGING + `/Patient?identifier=https://fhir.kemkes.go.id/id/nik|${nik}`;
  const { data, status } = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });

  console.log('patient data:', data);

  return data;
}

interface Patient {
  name: string;
  gender: string;
  birthdate: string;
  nik: number;
  photo_url: string;
  config_id: string;
  ss_id: string;
  phone: string;
  address: string;
  address_city: string;
  address_postal: string;
  marital: 'M' | 'S' | 'U' | 'D' | 'L' | 'I' | 'W';
  relative: string;
  relative_phone: string;
  birthplace: string;
  email: string;
}

const getMaritalStatus = (status: string) => {
  switch (status) {
    case 'M':
      return 'Married';
    case 'U':
      return 'Unmarried';
    case 'D':
      return 'Divorced';
    case 'L':
      return 'Legally Separated';
    case 'I':
      return 'Interlocutory';
    case 'W':
      return 'Widowed';
    case 'S':
    default:
      return 'Single';
  }
}

export const createPatient = async (data: Patient) => {
  const token = await getAuthToken();
  const url = process.env.SS_STAGING + '/Patient';
  const { status } = await axios.request({
    url: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    data: {
      resourceType: "Patient",
      meta: {
        profile: ["https://fhir.kemkes.go.id/r4/StructureDefinition/Patient"],
      },
      identifier: [
        {
          use: "official",
          system: "https://fhir.kemkes.go.id/id/nik",
          value: data.nik,
        },
      ],
      active: true,
      name: [
        {
          use: "official",
          text: data.name,
        },
        {
          use: "usual",
          text: data.name,
        },
      ],
      telecom: [
        {
          system: "phone",
          value: data.phone,
          use: "mobile",
        },
        {
          system: "email",
          value: data.email,
          use: "home"
        }
      ],
      gender: data.gender,
      birthDate: data.birthdate,
      deceasedBoolean: false,
      address: [
        {
          use: "home",
          line: [
            data.address,
          ],
          city: data.address_city,
          postalCode: data.address_postal,
          country: "ID",
        },
      ],
      maritalStatus: {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
            code: data.marital,
            display: getMaritalStatus(data.marital),
          },
        ],
        text: getMaritalStatus(data.marital),
      },
      multipleBirthInteger: 0,
      contact: [
        {
          relationship: [
            {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/v2-0131",
                  code: "C",
                },
              ],
            },
          ],
          name: {
            use: "official",
            text: data.relative,
          },
          telecom: [
            {
              system: "phone",
              value: data.relative_phone,
              use: "mobile",
            },
          ],
        },
      ],
      communication: [
        {
          language: {
            coding: [
              {
                system: "urn:ietf:bcp:47",
                code: "id-ID",
                display: "Indonesian",
              },
            ],
            text: "Indonesian",
          },
          preferred: true,
        },
      ],
      extension: [
        {
          url: "https://fhir.kemkes.go.id/r4/StructureDefinition/birthPlace",
          valueAddress: {
            city: data.birthplace,
            country: "ID",
          },
        },
        {
          url: "https://fhir.kemkes.go.id/r4/StructureDefinition/citizenshipStatus",
          valueCode: "WNI",
        },
      ],
    },
  });

  console.log('create patient status:', status);

  return status;
}