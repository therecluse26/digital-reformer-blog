---
username: "{{ .Name | lower }}"
date: {{ .Date }}
draft: true
---
{{ range where .Site.Data.authors  "username" .Name }}
# {{ .username }}
{{ .bio }}
{{ if .social }}{{ range .social }}{{ . }}
    {{ end }}{{ end }}
{{ end }}