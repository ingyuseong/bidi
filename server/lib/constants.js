const STATUS_CODE = {
  // 1XX: Information message
  CONTINUE: 100, // 진행 중임을 의미하는 응답코드입니다. 현재까지의 진행상태에 문제가 없으며, 클라이언트가 계속해서 요청을 하거나 이미 요청을 완료한 경우에는 무시해도 되는 것을 알려줍니다.

  // 2XX: Successful responses
  SUCCESS: 200, // 요청이 성공적으로 되었습니다. 정보는 요청에 따른 응답으로 반환됩니다.
  CREATED: 201, // 요청이 성공적이었으며 그 결과로 새로운 리소스가 생성되었습니다. 이 응답은 일반적으로 POST 요청 또는 일부 PUT 요청 이후에 따라옵니다.
  ACCEPTED: 202, // 클라이언트의 요청이 정상적이면 서버에선 작업의 성공|실패 응답하는 게 일반적이나, 작업 완료를 위한 일련의 작업들이 오래 걸리기 때문에 나중에 알려주겠다는 의미입니다.
  NO_CONTENT: 204, // 요청에 대해서 성공했지만 보낼 결과가 없습니다(PUT, DELETE 등). 사용자-에이전트는 리소스가 캐시된 헤더를 새로운 것으로 업데이트 할 수 있습니다.
  RESET_CONTENT: 205, // 이 응답 코드는 요청을 완수한 이후에 사용자 에이전트에게 이 요청을 보낸 문서 뷰를 리셋하라고 알려줍니다.

  // 3XX: Redirection message
  /*

  */

  // 4XX: Client error responses
  BAD_REQUEST: 400, // 이 응답은 잘못된 문법으로 인하여 서버가 요청하여 이해할 수 없음을 의미합니다.
  UNAUTHORIZED: 401, // 비록 HTTP 표준에서는 '미승인(unauthorized)'를 명확히 하고 있지만, 의미상 이 응답은 '비인증(unauthenticated)'를 의미합니다. 클라이언트는 요청한 응답을 받기 위해서는 반드시 스스로를 인증해야 합니다.
  FORBIDDEN: 403, // 클라이언트는 콘텐츠에 접근할 권리를 가지고 있지 않습니다. 예를 들어, 그들은 미승인이어서 서버는 거절을 위한 적절한 응답을 보냅니다. 401과 다른 점은 서버가 클라이언트가 누구인지 알고 있습니다.
  NOT_FOUND: 404, // 서버는 요청받은 리소스를 찾을 수 없습니다. 브라우저에서는 알려지지 않은 URL을 의미합니다. 이것은 API에서 종점은 적절하지만 리소스 자체는 존재하지 않음을 의미할 수 있습니다. 서버들은 인증받지 않은 클라이언트로부터 리소스를 숨기기 위하여 이 응답을 403 대신에 전송할 수도 있습니다. 이 응답 코드는 웹에서 반복적으로 발생하기 때문에 가장 유명할지도 모릅니다.

  // 5XX: Server error responses
  INTERNAL_SERVER_ERROR: 500, // 웹 사이트 서버에 문제가 있음을 의미하지만 서버는 정확한 문제에 대해 더 구체적으로 설명할 수 없습니다.
}

const ERROR_MESSAGE = {
  CLIENT_ERROR: 'Request Error',
  UNAUTHORIZED_ERROR: 'Unauthorized Error',
  SERVER_ERROR: 'Server Error',

  // Routing Error Message
  ROUTES_ERROR: 'Routes: Failed to routing',

  // Services Error Message
  SERVICES_ERROR: 'Services: Failed to call services',

  // Sequelize Error Message
  SEQUELIZE_CREATE_ERROR: 'Sequelize: Failed to CREATE resource',
  SEQUELIZE_READ_ERROR: 'Sequelize: Failed to READ resource',
  SEQUELIZE_UPDATE_ERROR: 'Sequelize: Failed to UPDATE resource',
  SEQUELIZE_DELETE_ERROR: 'Sequelize: Failed to DELETE resource',
}

const COLOR_LIST = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'purple',
]
module.exports = { STATUS_CODE, ERROR_MESSAGE, COLOR_LIST }
