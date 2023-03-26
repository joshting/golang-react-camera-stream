package main

import (
	_ "embed"

	"github.com/gin-gonic/gin"
	"joshuating.com/videostream/api"
)

//go:embed frontend/dist/index.html
var indexhtml []byte

func returnIndexHtml(c *gin.Context) {
	c.Header("Content-Type", "text/html")
	_, _ = c.Writer.Write(indexhtml)
}

func main() {

	router := gin.Default()

	router.GET("/", returnIndexHtml)
	router.GET("/stream/:streamId", returnIndexHtml)
	// router.Static("/home", "./frontend/dist/")
	router.Static("/assets", "./frontend/dist/assets")

	api.LoadStreams()

	// rest apis
	router.GET("/api/all", api.GetStreams)
	router.GET("/api/byid/:id", api.GetById)
	router.DELETE("/api/delete/:id", api.DeleteStream)
	router.POST("/api/save", api.SaveStream)

	router.Run(":8080")

}
