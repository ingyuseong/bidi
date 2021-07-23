let totalCount = 0;
let count = 0;
const CLASS_NAME = "lwEWu _1dEyY";

function getVaccine(name) {
  const lists = document.getElementsByClassName(name);
  for (let i = 0; i < lists.length; i++) {
    if (lists[i]) {
      lists[i].click();
    } else {
      console.log("Lext >> ", i);
    }
  }
}

const updateVaccine = () => {
  const updateBtn = document.querySelector("._1MCHh");
  if (updateBtn) {
    updateBtn.click();
  } else {
    console.log("Next >> ");
  }
};

const getData = async () => {
  const response = await fetch("https://api.place.naver.com/graphql", {
    headers: {
      accept: "*/*",
      "accept-language": "ko",
      "content-type": "application/json",
      "sec-ch-ua":
        '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      cookie:
        "NNB=FUFHQL4UZXNGA; NDARK=Y; nx_ssl=2; ASID=79816c680000017a56b4d93e00000060; _fbp=fb.1.1625459408063.1616014623; _ga_4BKHBFKFK0=GS1.1.1625803984.4.1.1625804007.37; _ga=GA1.2.1845033194.1625459407; _ga_7VKFYR6RV1=GS1.1.1626073758.6.0.1626073758.60; BMR=s=1626231025030&r=https%3A%2F%2Fm.blog.naver.com%2Fluavy%2F222423888079&r2=; nid_inf=615735123; NID_AUT=SIUqxl42cX/V5c4/7yoK+oQjpjeceieronNuMnkiVxS1TIgcpjSozQplffXfTKYu; NID_JKL=HboUs0diIRnW0Q1tgBBlEUsEUsqQ9VBopCoGMl84Gfk=; page_uid=hnAyCdp0J1sssK92RoVsssssszV-508580; NID_SES=AAABrfUvSCJZUZqvkTXcy7p816a5xQhjGsQ+aTsczzI6GB/yUJKEqhIO07XN7uSvnPn0Wr0tmnqAbzA6/A85ubytp9Bh5oo5bUk/W0XJWSTsA3sdP82SqMqnOOvp4k99VHQRyu23Z+ppSYj22YyLKaGovWYzDXF78bgGL2DVY5fRarovLnUfcHXDGahzob9djkfEVYiKn8KAxVt+1xP033XW7Y+xXkPPiP75GN0GEyXJwWaz9Zve6wu8cRCuwkIhBcrfAp8tixevFyFCB6AdtsVVehYYymPAiHMT9OQNchI7PT6xviY+Sbp0E+ZL8f+lM8dBUWg65btWzvgPCPtyx2e3ceuKPiKaMVPlmhBAHHVWzrITmk8UXY9/VEBCETE4eKh78w694BSeng7J2O2fv3PquZ4sPoDMwTLjLv9CfD+i3GhFW/j8NHRnnERlvbgriy1WwvDyaENnGYPipuvFixolVkDUMP7GcyuzknnDm+CwpM22uFvUZ0QypJ7g9Uk9Zusel3lgf/xymQyGFUkO7k+Sgl/nx7tftPAAsDUx6XVjcW3uWVGB2iMlyKyLrQtDD35+VA==",
    },
    referrer:
      "https://m.place.naver.com/rest/vaccine?vaccineFilter=used&x=127.0215562&y=37.6031172&bounds=126.9616893%3B37.5772048%3B127.0814231%3B37.6290207",
    referrerPolicy: "unsafe-url",
    body: '[{"operationName":"vaccineList","variables":{"input":{"keyword":"코로나백신위탁의료기관","categories":["1004836"],"x":"127.0215562","y":"37.6031172"},"businessesInput":{"start":0,"display":100,"deviceType":"mobile","x":"127.0215562","y":"37.6031172","bounds":"126.9616893;37.5772048;127.0814231;37.6290207","sortingOrder":"distance"},"isNmap":false,"isBounds":false},"query":"query vaccineList($input: RestsInput, $businessesInput: RestsBusinessesInput, $isNmap: Boolean!, $isBounds: Boolean!) {\\n  rests(input: $input) {\\n    businesses(input: $businessesInput) {\\n      total\\n      vaccineLastSave\\n      isUpdateDelayed\\n      items {\\n        id\\n        name\\n        dbType\\n        phone\\n        virtualPhone\\n        hasBooking\\n        hasNPay\\n        bookingReviewCount\\n        description\\n        distance\\n        commonAddress\\n        roadAddress\\n        address\\n        imageUrl\\n        imageCount\\n        tags\\n        distance\\n        promotionTitle\\n        category\\n        routeUrl\\n        businessHours\\n        x\\n        y\\n        imageMarker @include(if: $isNmap) {\\n          marker\\n          markerSelected\\n          __typename\\n        }\\n        markerLabel @include(if: $isNmap) {\\n          text\\n          style\\n          __typename\\n        }\\n        isDelivery\\n        isTakeOut\\n        isPreOrder\\n        isTableOrder\\n        naverBookingCategory\\n        bookingDisplayName\\n        bookingBusinessId\\n        bookingVisitId\\n        bookingPickupId\\n        vaccineOpeningHour {\\n          isDayOff\\n          standardTime\\n          __typename\\n        }\\n        vaccineQuantity {\\n          totalQuantity\\n          totalQuantityStatus\\n          startTime\\n          endTime\\n          vaccineOrganizationCode\\n          list {\\n            quantity\\n            quantityStatus\\n            vaccineType\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      optionsForMap @include(if: $isBounds) {\\n        maxZoom\\n        minZoom\\n        includeMyLocation\\n        maxIncludePoiCount\\n        center\\n        __typename\\n      }\\n      __typename\\n    }\\n    queryResult {\\n      keyword\\n      vaccineFilter\\n      categories\\n      region\\n      isBrandList\\n      filterBooking\\n      hasNearQuery\\n      isPublicMask\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"}]',
    method: "POST",
    mode: "cors",
  });
  const messages = await response.json();
  const lists = messages[0].data.rests.businesses.items;
  for (let i = 0; i < lists.length; i++) {
    if (lists[i].vaccineQuantity?.totalQuantity) {
      totalCount += lists[i].vaccineQuantity?.totalQuantity;
      getVaccine(CLASS_NAME);
      console.log("———", lists[i].vaccineQuantity.list, "———");
      alert("백신이닷", lists[i].name);
    }
  }
};

let timer = setInterval(() => {
  updateVaccine();
  getData();
  count += 1;
  console.log("반복 횟수 >", count, totalCount);
}, 2000);
