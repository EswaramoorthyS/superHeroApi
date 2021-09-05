#pragma once

#include <iostream>
#include <string>


namespace learning {
constexpr char kSaveEndpoint[] = "/save";
constexpr char kWinsEndpoint[] = "/wins";
constexpr char kDeleteEndpoint[] = "/delete";
constexpr char kAllCharactersEndpoint[] = "/";
constexpr char kIpAddress[] = "0.0.0.0";
constexpr char kPort[] = "5000";
constexpr int kThreads = 10;

class HttpServer {
 public:
  HttpServer(multiplexer multiplexer) : multiplexer(multiplexer) {}

  auto SaveCharacterToMongoDb() {
    return [&](served::response &response, const served::request &request) {
      json::JSON request_body = json::JSON::Load(request.body());
      std::string size = request_body["size"].ToString();
      auto maybe_size = string_to_character_size.find(size);

      if (maybe_size == string_to_character_size.end()) {
        return served::response::stock_reply(400, response);
      }

      MongoDbHandler mhandler;
      bool insert_successful = mhandler.AddCharacterToDb(
          request_body["characterName"].ToString(), maybe_size->second,
          request_body["wins"].ToInt());
      insert_successful ? served::response::stock_reply(200, response)
                        : served::response::stock_reply(400, response);
    };
  }

 
  


  void StartServer() {
    mongocxx::instance instance;
    served::net::server server(kIpAddress, kPort, multiplexer);
    std::cout << "Starting server to listen on port " << kPort << "..."
              << std::endl;
    server.run(kThreads);
  }

 private:
  served::multiplexer multiplexer;
};
}  