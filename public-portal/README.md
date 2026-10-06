# Public portal

URL: https://aks-portal.dccpl-opcenter-cloud.com/CamstarPortal/

Deployed to context `opcenter-aks-cluster`, namespace `dev-opcenter`.
The public LoadBalancer currently has IP `20.235.154.21`. Route53 zone
`Z1006518345MPUN1ALWG0` contains the corresponding A record. The original
`portal.dccpl-opcenter-cloud.com` record was not changed.

Caddy exposes only `/CamstarPortal` and its subpaths, redirects HTTP to HTTPS,
and obtains/renews the public certificate automatically. Certificate state is
persisted on the gateway PVC. Internal WCF paths are not published.
The gateway verifies the backend IIS certificate using the certificate in
`opcenter-portal-backend-tls`; the portal imports its PFX on container startup.
The backend certificate is valid for one year from creation and requires
rotation before expiry, including updating the gateway trust and portal binding.
Never commit the PFX or its password.

Preserve the TLS override during future upgrades:

```powershell
helm upgrade opcenter-core ./opcenter-core --kube-context opcenter-aks-cluster -n dev-opcenter --reuse-values -f ./public-portal/portal-tls-values.yaml --wait --timeout 15m
kubectl --context opcenter-aks-cluster apply -f ./public-portal/gateway.yaml
```

Run these commands from the parent chart directory. Do not replay
`dns-change.json`: it records the initial CREATE operation, not an idempotent
deployment. If the LoadBalancer service is deleted/recreated, verify its public
IP and update DNS as needed. Gateway resources are managed separately from Helm.

The endpoint is internet-facing: use individual authorized accounts and strong
passwords. LoadBalancer, public IP, and disk resources incur Azure charges.
Public login-page availability does not by itself verify authenticated workflows.
