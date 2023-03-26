package api

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type VideoStream struct {
	Id    int    `json:"id"`
	Name  string `json:"name"`
	WsUrl string `json:"wsUrl"`
}

var streams = []VideoStream{}

func refreshIds() {
	for i, _ := range streams {
		streams[i].Id = (i + 1)
	}
}

func LoadStreams() {
	file, _ := ioutil.ReadFile("config.json")
	_ = json.Unmarshal([]byte(file), &streams)
}

func GetStreams(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, streams)
}

func GetById(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err == nil && id > 0 && id <= len(streams) {

		c.IndentedJSON(http.StatusOK, streams[id-1])
	} else {
		c.Status(http.StatusBadRequest)
	}
}

func SaveStream(c *gin.Context) {
	var newStream VideoStream

	if err := c.BindJSON(&newStream); err != nil {
		return
	}

	if newStream.Id > 0 {
		// update stream
		for i, _ := range streams {
			if streams[i].Id == newStream.Id {
				streams[i].Name = newStream.Name
				streams[i].WsUrl = newStream.WsUrl
				break
			}
		}
	} else {

		refreshIds()

		// new stream
		newStream.Id = len(streams) + 1
		streams = append(streams, newStream)
	}
	file, _ := json.MarshalIndent(streams, "", " ")
	_ = ioutil.WriteFile("config.json", file, 0644)
	c.IndentedJSON(http.StatusCreated, newStream)
}

func DeleteStream(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err == nil && id > 0 && id <= len(streams) {
		streams[id-1] = streams[len(streams)-1]
		streams[len(streams)-1] = VideoStream{}
		streams = streams[:len(streams)-1]

		refreshIds()

		file, _ := json.MarshalIndent(streams, "", " ")
		_ = ioutil.WriteFile("config.json", file, 0644)
		c.Status(http.StatusOK)
	} else {
		c.Status(http.StatusBadRequest)
	}
}
