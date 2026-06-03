add storage account password in secrets and kubeconfig secrets ....and cluster login details to ...

## Terraform CI - Azure backend

- Workflow added: [.github/workflows/terraform-azure.yml](.github/workflows/terraform-azure.yml)
- Purpose: Bootstrap an Azure Storage Account + container (if missing) and run `terraform init`/`apply` using the storage backend.

Required repository secrets:

- `AZURE_CREDENTIALS` — service principal JSON (create with `az ad sp create-for-rbac --sdk-auth`).
- `AZURE_SUBSCRIPTION_ID` — subscription id to operate on.
- `AZURE_LOCATION` — region for tfstate resources (e.g., `eastus`).
- `TFSTATE_RG` — resource group name for tfstate storage.
- `TFSTATE_STORAGE_ACCOUNT` — storage account name (must be globally unique).
- `TFSTATE_CONTAINER` — blob container name for tfstate.
- `TFSTATE_KEY` — object name for the state file, e.g. `terraform.tfstate`.

Notes:

- Terraform remote backend must exist before `terraform init`. The workflow ensures the resource group, storage account and container exist before running `terraform init`.
- The storage account name must be unique across Azure subscriptions.
- To create a service principal and publish credentials to GitHub Secrets, run:

```bash
az ad sp create-for-rbac --name "github-actions-terraform" --role Contributor --scopes /subscriptions/<SUBSCRIPTION_ID> --sdk-auth
```

Store the resulting JSON in the `AZURE_CREDENTIALS` secret.
