package main

import (
	"github.com/gin-gonic/gin"
	"joshuating.com/videostream/api"
)

func main() {

	router := gin.Default()

	WebInit(router)
	api.Init(router)

	router.Run(":8080")

}
