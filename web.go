package main

import (
	_ "embed"

	"github.com/gin-gonic/gin"
)

//go:embed frontend/dist/index.html
var indexhtml []byte

func returnIndexHtml(c *gin.Context) {
	c.Header("Content-Type", "text/html")
	_, _ = c.Writer.Write(indexhtml)
}

func WebInit(router *gin.Engine) {
	router.GET("/", returnIndexHtml)
	router.GET("/stream/:streamId", returnIndexHtml)
	router.Static("/assets", "./frontend/dist/assets")
	router.StaticFile("/icon.svg", "./frontend/dist/icon.svg")
}
