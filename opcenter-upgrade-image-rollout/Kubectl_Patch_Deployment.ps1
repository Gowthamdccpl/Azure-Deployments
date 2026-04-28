# Copyright Siemens 2024
# This file will update deployment by changing image tag and revision directory of the pods

#1 Specify Namespace on which we want to patch the deployment and configmap
$Namespace ="factory1"

# If you dont have node pool with WindowsServer2022 then only execute below command otherwise skip below node creation command.
#az aks nodepool add --cluster-name dev-opcenter-aks # Specify Your AKS Cluster Name
#                    --name win22 # Specify Name of NodePool
#					--resource-group DEV-OPCENTER-RG # Specify Your Resource Group
#					--os-sku Windows2022 # This will pick WindowsServer2022
#					--mode User 
#					--node-vm-size Standard_D8_v4 # Change VM Size as per your requirement 
#					--max-pods 30 # Change Max Pods/Node as per your requirement
#					--node-count 2 # Change Total Node Count as per your requirement
#					--os-type Windows

#2 Patch ConfigMap to use new revision folder, Need to update value of below command as per your requirement
Kubectl patch configmap opcenter-deploy-config -n $Namespace --type=json -p='[{"op": "replace", "path": "/data/OPCORE_METADATA_PATH", "value": "C:\opcenter-metadata\factory1\2410.0002.0002"}]'

#3 Patch notification-service to use new image tag, Need to update value of below command as per your requirement
#Kubectl patch deployment notification-service -n $Namespace --type=json -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/image", "value": "opcentercoreinternalregistry.azurecr.io/notification-service:2410.0002"}]'

Kubectl patch deployment notification-service -n $Namespace --type=json -p='[
{"op": "replace", "path": "/spec/template/spec/containers/0/image", "value": "opcentercoreinternalregistry.azurecr.io/notification-service:2410.0002"},
{"op": "add","path": "/spec/template/spec/nodeSelector/kubernetes.azure.com~1os-sku", "value": "Windows2022"}]' #Here ~ is used to encode / 

#4 Patch security-services to use new image tag, Need to update value of below command as per your requirement
#Kubectl patch deployment security-services -n $Namespace --type=json -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/image", "value": "opcentercoreinternalregistry.azurecr.io/security-services:2410.0002"}]'

Kubectl patch deployment security-services -n $Namespace --type=json -p='[
{"op": "replace", "path": "/spec/template/spec/containers/0/image", "value": "opcentercoreinternalregistry.azurecr.io/security-services:2410.0002"},
{"op": "add","path": "/spec/template/spec/nodeSelector/kubernetes.azure.com~1os-sku", "value": "Windows2022"}]' #Here ~ is used to encode / 

#5 Patch app-server to use new image tag, Need to update value of below command as per your requirement
#Kubectl patch deployment app-server -n $Namespace --type=json -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/image", "value": "opcentercoreinternalregistry.azurecr.io/app-server:2410.0002"}]'

Kubectl patch deployment app-server -n $Namespace --type=json -p='[
{"op": "replace", "path": "/spec/template/spec/containers/0/image", "value": "opcentercoreinternalregistry.azurecr.io/app-server:2410.0002"},
{"op": "add","path": "/spec/template/spec/nodeSelector/kubernetes.azure.com~1os-sku", "value": "Windows2022"}]' #Here ~ is used to encode /

#6 We need to add rollout to prevent loading of portal before app-server pod is ready, Change timeout as per your requirement
kubectl rollout status -n $Namespace deploy/app-server --timeout=-1s

#7 Patch app-server-sf to use new image tag, Need to update value of below command as per your requirement
#Kubectl patch deployment app-server-sf -n $Namespace --type=json -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/image", "value": "opcentercoreinternalregistry.azurecr.io/app-server-with-connect:2410.0002"}]'

#Kubectl patch deployment app-server-sf -n $Namespace --type=json -p='[
#{"op": "replace", "path": "/spec/template/spec/containers/0/image", "value": "opcentercoreinternalregistry.azurecr.io/app-server-with-connect:2410.0002"},
#{"op": "add","path": "/spec/template/spec/nodeSelector/kubernetes.azure.com~1os-sku", "value": "Windows2022"}]' #Here ~ is used to encode /

#8 We need to add rollout to prevent loading of portal before app-server-sf pod is ready, Change timeout as per your requirement
#kubectl rollout status -n $Namespace deploy/app-server-sf --timeout=-1s

#9 We need to do dbupdate to load Camstarportal object before portal pod rollout, Change filename as per your requirement
helm install $Namespace-dbupdate1 ./opcenter-core-dbupdate --namespace $Namespace --values ./$Namespace-dbupdate-values-WithLCO.yaml
kubectl wait --for=condition=complete job/$Namespace-dbupdate1-opcenter-core-dbupdate -n $Namespace --timeout=-1s

#10 Patch portal to use new image tag, Need to update value of below command as per your requirement to use latest image tag and new revision directory for mount
Kubectl patch deployment portal -n $Namespace --type=json -p='[
{"op": "replace", "path": "/spec/template/spec/containers/0/image", "value": "opcentercoreinternalregistry.azurecr.io/portal:2410.0002"},
{"op": "replace", "path": "/spec/template/spec/containers/0/volumeMounts/1/subPath", "value": "factory1\2410.0002\portal\User"},
{"op": "add","path": "/spec/template/spec/nodeSelector/kubernetes.azure.com~1os-sku", "value": "Windows2022"}]' #Here ~ is used to encode /

