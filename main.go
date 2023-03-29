package main

import (
	"github.com/gin-gonic/gin"
	"joshuating.com/videostream/api"
	"joshuating.com/videostream/web"
)

func main() {

	router := gin.Default()

	web.Init(router)
	api.Init(router)

	router.Run(":8080")

}
