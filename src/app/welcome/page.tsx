import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const Welcome: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        marginRight: "0.8rem",
        gap: 2,
        userSelect: "none",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginBottom: 2,
          color: "#6b7280",
          lineHeight: 1.6,
          textAlign: "left",
        }}
      >
        Welcome to the Brood War Fantasy League. Select the 15 players who you
        think will take the most wins in the next ASL/SSL season. Accumlate
        points, check your standing through each day of the tournament, and
        become the Brood War League Champion!
      </Typography>
      <Typography
        variant="h6"
        sx={{
          marginBottom: 2,
          color: "#6b7280",
          lineHeight: 1.6,
          textAlign: "left",
        }}
      >
        Create your fantasy team by going to the Team page and selecting 15
        players across 5 tiers. The tier system has progressively increasing
        selection limits, and a minimum selection requirement. However, the
        minimum selection requirement can be broken by 'spending' lower (better
        player) tier slots in higher tiers. That means that you can select all
        15 players from Tier 4 if that's the team you want to draft! There is an
        important note, though, for the above strategy and in general: players
        who qualify for the ASL/SSL Ro24 are split into tiers 1 through 4 based
        on how their ASL/SSL performance history ranks against the performance
        of the other qualified players. The players in each tier are then
        divided evenly among the Ro24 groups, so that each group has 1 player
        from each tier. Players do not often change tiers. Brood War League
        follows the offical tiers as of the start of the last ASL/SSL season
        (except for 2 differences that I'll leave for you to spot). Seeded
        players are listed in Tier 0. The 15th selection in your team draft is a
        wildcard player, always drawn from Tier 4, who will swap with any player
        in the 14 who (if any) does not qualify for the Ro24. The wildcard
        player may not qualify either, but it exists as a potential backup. Also
        look out for the crown icon in your team draft: you can use it to select
        a Team Captain, who earns twice as many points per win but also costs
        the team 1 point per loss!
      </Typography>
      <Typography
        variant="h6"
        sx={{
          marginBottom: 2,
          color: "#6b7280",
          lineHeight: 1.6,
          textAlign: "left",
        }}
      >
        The team drafting period is open until the first ASL/SSL qualifier: you
        are drafting a team of not only who you think will take the most wins in
        the tournament, but of who you think will qualify for the Ro24! Your
        team accumulates 1 point per win starting in the Ro24 (with the
        exception of your Team Captain, if you select one). The Charts and Maps
        pages have additional data that may help with your team selection. Check
        the leaderboard and the latest tournament results on the Results page.
      </Typography>
    </Box>
  );
};

export default Welcome;
