import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Paper,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import StarIcon from "@mui/icons-material/Star";

const PricingPage = () => {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "month",
      description: "Perfect for getting started with basic features",
      features: [
        "Up to 5 projects",
        "Basic templates",
        "Community support",
        "1GB storage",
        "Basic analytics",
      ],
      buttonText: "Get Started",
      buttonVariant: "outlined",
      popular: false,
    },
    {
      name: "Pro",
      price: "₹499",
      period: "month",
      description: "Best for professionals and growing teams",
      features: [
        "Unlimited projects",
        "Premium templates",
        "Priority support",
        "50GB storage",
        "Advanced analytics",
        "Team collaboration",
        "Custom integrations",
        "API access",
      ],
      buttonText: "Upgrade to Pro",
      buttonVariant: "contained",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "₹1,299",
      period: "month",
      description: "For large organizations with advanced needs",
      features: [
        "Everything in Pro",
        "Unlimited storage",
        "Dedicated support",
        "Advanced security",
        "Custom workflows",
        "SSO integration",
        "Admin controls",
        "SLA guarantee",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outlined",
      popular: false,
    },
  ];

  return (
    <Box>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h1" component="h1" gutterBottom>
            Choose Your Plan
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Select the perfect plan for your needs. Upgrade or downgrade at any
            time.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 4,
            maxWidth: 1200,
            mx: "auto",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              component={Paper}
              elevation={plan.popular ? 8 : 2}
              sx={{
                position: "relative",
                flex: 1,
                maxWidth: { xs: "100%", lg: 400 },
                display: "flex",
                flexDirection: "column",
                transition:
                  "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: plan.popular ? 12 : 6,
                },
                border: plan.popular ? 2 : 0,
                borderColor: "primary.main",
              }}
            >
              {plan.popular && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                    paddingTop: 0.5,
                  }}
                >
                  <Chip
                    icon={<StarIcon />}
                    label="Most Popular"
                    color="primary"
                    variant="filled"
                    sx={{
                      fontWeight: 600,
                      px: 2,
                      whiteSpace: "nowrap",
                    }}
                  />
                </Box>
              )}

              <CardContent
                sx={{
                  flexGrow: 1,
                  p: 4,
                  pt: plan.popular ? 6 : 4,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Box sx={{ textAlign: "center", mb: 3 }}>
                  <Typography
                    variant="h4"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {plan.name}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="h3"
                      component="span"
                      sx={{ fontWeight: 700, color: "primary.main" }}
                    >
                      {plan.price}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="span"
                      sx={{ color: "text.secondary", ml: 1 }}
                    >
                      / {plan.period}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    {plan.description}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3, flexGrow: 1 }}>
                  <List sx={{ py: 0 }}>
                    {plan.features.map((feature, featureIndex) => (
                      <ListItem key={featureIndex} sx={{ py: 0.5, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckIcon color="primary" sx={{ fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          primaryTypographyProps={{
                            variant: "body2",
                            color: "text.primary",
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Box sx={{ mt: "auto" }}>
                  <Button
                    variant={plan.buttonVariant}
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{
                      py: 1.5,
                      fontWeight: 600,
                      fontSize: "1rem",
                      textTransform: "none",
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Bottom CTA Section */}
        <Box sx={{ textAlign: "center", mt: 8 }}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Need a custom plan? We're here to help.
          </Typography>
          <Button variant="text" color="primary" sx={{ fontWeight: 600 }}>
            Contact us for enterprise solutions
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default PricingPage;
