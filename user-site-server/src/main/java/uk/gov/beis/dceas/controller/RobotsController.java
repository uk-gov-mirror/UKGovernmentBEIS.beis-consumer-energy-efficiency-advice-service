package uk.gov.beis.dceas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class RobotsController {

    private final Boolean allowRobots;

    @Autowired
    public RobotsController(
        @Value("${vcap.application.space_name}") String spaceName
    ) {
        this.allowRobots = spaceName.toUpperCase().equals("LIVE");
    }

    @RequestMapping(value = "/robots.txt", method = RequestMethod.GET)
    @ResponseBody
    public String getRobots() {
        return allowRobots ? "User-agent: *\nAllow: /\n" : "User-agent: *\nDisallow: /\n";
    }
}
